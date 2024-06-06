#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[upgrade]
    fn upgrade(&self) {}

    #[endpoint]
    fn simple_test(
        &self,
        test_params: MultiValueEncoded<
            MultiValue3<
                TokenIdentifier<Self::Api>,
                ManagedBuffer<Self::Api>,
                ManagedBuffer<Self::Api>,
            >,
        >,
    ) {
    }

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
}
