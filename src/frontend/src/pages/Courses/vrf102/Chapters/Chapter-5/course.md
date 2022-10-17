#####Chapter 5: VRF Subscriptions

# Subscription Manager Contract

Now that we learned more about the theoretical background, let’s get practical. We want to create and manage a subscription contract. We will use the example contract that you can find here on [Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/VRF/VRFv2SubscriptionManager.sol&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js). It shows an example implementation of a VRF v2 Subscription manager for the Goerli network. But you can also adjust it to work with other networks by changing the code's hardcoded addresses. You can find a complete list of available networks [here](https://docs.chain.link/docs/vrf-contracts/#configurations).

Hint: This course assumes you are already familiar with the Architecture of Chainlink VRF from [VRFv2 Introduction Chapter 4](https://www.chainlink.education/vrfIntroduction/chapter-4).

Generally, consumer contracts must implement the requestRandomWords() function providing coordinator parameters and subscription ID. This function is used to create random values. A second function, fulfillRandomWords(), must be implemented to receive the random values. Learn about how to implement the basics of such a contract in [chapters 6-12](https://www.chainlink.education/vrfIntroduction/chapter-6) from the introduction course.

We want to focus on the mentioned functions here and show how to manage subscriptions in this contract. So let’s start by creating a new subscription:

<Highlight class="language-javascript">
uint64 public s_subscriptionId;
 function createNewSubscription() private onlyOwner {
   s_subscriptionId = COORDINATOR.createSubscription();
   COORDINATOR.addConsumer(s_subscriptionId, address(this));
 }
</Highlight>

We shall call this function when the contract is initially deployed using the constructor. The COORDINATOR is set to the COORDINATOR address in your network of choice. It is used to call the createSubscription() function. This returns an ID which is then used to add a new consumer using the same COORDINATOR contract. That’s already all you need to create a subscription and add a consumer. Now we can expand this and add or remove consumers using the corresponding functions (addConsumer, removeConsumer) to generate random numbers.

<Highlight class="language-javascript">
 function addConsumer(address consumerAddress) external onlyOwner {
   COORDINATOR.addConsumer(s_subscriptionId, consumerAddress);
 }
 
 function removeConsumer(address consumerAddress) external onlyOwner {
   COORDINATOR.removeConsumer(s_subscriptionId, consumerAddress);
 }
</Highlight>

This was pretty straight forward. Before we implement the mandatory functions mentioned in the beginning, we will also add a function to topup the subscription with LINK tokens. That means we pre-fund the subscription so it can then be used to request random numbers without paying again, like in VRF v1.

<Highlight class="language-javascript">
 function topUpSubscription(uint256 amount) external onlyOwner {
   LINKTOKEN.transferAndCall(address(COORDINATOR), amount, abi.encode(s_subscriptionId));
 }
</Highlight>

We assume that the contract itself has Link that we can use here. LINKTOKEN is the Link token contract. Now that we have the ability to manage consumers and funding, we will implement a simple function to request random words and received a request ID that we can use to get the random words. If the subscription is not set and funded it will revert. Note that the request might take several minutes to process.

<Highlight class="language-javascript">
function requestRandomWords() external onlyOwner {
   s_requestId = COORDINATOR.requestRandomWords(
     keyHash,
     s_subscriptionId,
     requestConfirmations,
     callbackGasLimit,
     numWords
   );
 }
</Highlight>

You can see that we don’t need to provide any parameters here though the COORDINATOR expects 5 of them. We have hard coded these values in the contract, but you could also ask the caller of the function to provide these values depending on your implementation. Let’s look into each parameter.

- **keyHash** defines which gas lane to use, which specifies the maximum gas price
- **s_subscriptionId** is set when the contract is deployed and a new subscription is created.
- **requestConfirmations** is three by default but you can set it higher.
- **callbackGasLimit** allows to set the the limit so more complex contracts can be developed using a single transaction to get verifiable randomness to their contract.
- **numWords** defines the number of random values which we want to get in one request.

So now that we have a function to request random words, we still need to implement a function to actually get the random words. This function is then called as a callback by the COORDINATOR to set the random values.

<Highlight class="language-javascript">
 uint256[] public s_randomWords;
 function fulfillRandomWords(
   uint256, /* requestId */
   uint256[] memory randomWords
 ) internal override {
   s_randomWords = randomWords;
 }
</Highlight>

The results are stored as a uint256 array. It can now be used by other functions or applications for further processing. If you wanted to have a random number between 0 and 10 you would simply use modulo: s_randomWords[0] % 10.
