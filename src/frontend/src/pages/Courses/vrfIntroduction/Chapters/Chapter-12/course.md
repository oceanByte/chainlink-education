#####Chapter 12: Subscribing to the VRF

# Subscribing

Congrats you have completed the contract! Your final contract should look like this:

<Highlight class="language-javascript">
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract VRFv2SubscriptionManager is VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;
  LinkTokenInterface LINKTOKEN;


  address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;
  address linkTokenContract = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;
  bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;
  uint32 callbackGasLimit = 100000;
  uint16 requestConfirmations = 3;
  uint32 numWords =  2;

  // Storage parameters
  uint256[] public s_randomWords;
  uint256 public s_requestId;
  uint64 public s_subscriptionId;
  address s_owner;

  constructor() VRFConsumerBaseV2(vrfCoordinator) {
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    LINKTOKEN = LinkTokenInterface(linkTokenContract);
    s_owner = msg.sender;
  }

  function requestRandomWords() external {
    s_requestId = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numWords
    );
  }

  function fulfillRandomWords(
    uint256, // requestId
    uint256[] memory randomWords
  ) internal override {
    s_randomWords = randomWords;
  }
}
</Highlight>

Now that the contract is complete you need to subscribe your contract to the VRFCoordinator. You can do so via the Subscription Manager at [vrf.chain.link](https://vrf.chain.link/). Go to the website and follow the steps to see what it would be like to set up a subscription.