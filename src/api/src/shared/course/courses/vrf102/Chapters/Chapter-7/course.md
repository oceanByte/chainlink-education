#####Chapter 7:

# VRF Simultaneous Requests

As miners/validators decide on the order of randomness requests on-chain, you must be careful that your contracts consider it in their implementation. Let’s assume your contract creates multiple VRF requests in short succession. There is no guarantee that the order of completion and fulfillment will also be in the same order. It’s easy to prevent this issue using the requestID to match randomness requests and fulfillments. But you must be aware that this is a potential issue in the first place. See more details [here](https://docs.chain.link/docs/vrf/v2/best-practices/#processing-simultaneous-vrf-requests).

<Highlight class="language-javascript">
mapping(uint256 => uint256[]) public s_requestIdToRandomWords;
mapping(uint256 => address) public s_requestIdToAddress;
uint256 public s_requestId;
 
function requestRandomWords() external onlyOwner returns (uint256) {
 uint256 requestId = COORDINATOR.requestRandomWords(
   keyHash,
   s_subscriptionId,
   requestConfirmations,
   callbackGasLimit,
   numWords
 );
 s_requestIdToAddress[requestId] = msg.sender;
 
 // Store the latest requestId for this example.
 s_requestId = requestId;
 
 // Return the requestId to the requester.
 return requestId;
}
 
function fulfillRandomWords(
   uint256 requestId,
   uint256[] memory randomWords
 ) internal override {
 // You can return the value to the requester,
 // but this example simply stores it.
 s_requestIdToRandomWords[requestId] = randomWords;
}
</Highlight>

As you can see, this contract uses a mapping to handle the different requests and assign the results based on the requestId. This way, the order of the results does not matter.
