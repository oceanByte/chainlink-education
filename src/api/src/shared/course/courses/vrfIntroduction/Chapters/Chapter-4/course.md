#####Chapter 4:

# Architecture of Chainlink VRF

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Every programmer knows it’s good to have at least a basic understanding of how the technology you use works! Time to dive into the inner workings of Chainlink VRF a bit.
    </div>
  </div>
</ContentWrapp>

Chainlink VRF is essentially the DON itself (the computers running the Chainlink nodes) and 2 main smart contracts:

- The Client Contract (VRFConsumerBaseV2)
- The VRF Coordinator Contract (VRFCoordinatorV2)

VRF Client Contract:

The contract you are building must import and inherit the client contract. It allows your contract to send the proper requests and receive answers from the Chainlink VRF. To send requests it allows your contract to utilize a function called “RequestRandomness”. To receive answers your contract will need to have a “FulfillRandomness” function. To import the Client Contract you need only one line at the top of your Solidity code:

<Highlight class="language-javascript">
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
</Highlight>

And to inherit the contract you must put the following when naming your contract:

<Highlight class="language-javascript">
contract VRFv2Consumer is VRFConsumerBaseV2
</Highlight>

VRF Coordinator Contract:

The Coordinator contract has two main duties. Manage subscriptions to the Chainlink VRF and verify every random number alongside its proof. A VRF subscription represents a contract that wants to receive a random number, how many random numbers it wants to receive, and how many LINK tokens have been pre-paid for that contact (as for every Chainlink service LINK tokens are used to pay the Chainlink VRF for every random number requested). So it essentially coordinates the random numbers sent out by Chainlink VRF!
