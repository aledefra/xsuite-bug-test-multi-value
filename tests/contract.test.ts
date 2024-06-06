import { test, beforeEach, afterEach } from "vitest";
import { e, FSWorld, FSWallet, FSContract } from "xsuite";

let world: FSWorld;
let deployer: FSWallet;
let contract: FSContract;

beforeEach(async () => {
	world = await FSWorld.start();
	deployer = await world.createWallet({
		balance: 10n ** 18n,
	});
	contract = await deployer.createContract({
		code: "file:output/contract.wasm",
		codeMetadata: [],
	});
});

afterEach(async () => {
	world.terminate();
});

test("Tx with MultiValueEncoded", async () => {
	await deployer.callContract({
		callee: contract,
		funcName: "simple_test",
		funcArgs: [
			e.Tuple(e.Str("test"), e.Str("another_test"), e.Str("test2")),
		],
		gasLimit: 20_000_000,
	});
});

test("Tx with MultiValueEncoded and loop", async () => {
	await deployer.callContract({
		callee: contract,
		funcName: "simple_test_with_loop",
		funcArgs: [
			e.Tuple(e.Str("test"), e.Str("another_test"), e.Str("test2")),
		],
		gasLimit: 20_000_000,
	});
});
