Install the dependencies:

```
npm install
```

To run the tests:

```
npm run test
```

(Optional) To build the SC:

```
npm run build
```

**The endpoint:**

In `src/lib.rs`:

```
#[endpoint]
fn simple_test_with_loop(
    &self,
    test_params: MultiValueEncoded<
        MultiValue3<
            TokenIdentifier<Self::Api>,
            ManagedBuffer<Self::Api>,
            ManagedBuffer<Self::Api>,
        >,
    >,
) {
    for test_param in test_params {}
}
```

**The test:**

In `tests/contract.test.ts`:

```
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
```

**The error:**

```
{ interaction: 'Transaction', code: 'signalError', msg: 'argument decode error (var args): too few arguments', ...
```
