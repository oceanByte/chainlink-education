#####Chapter 6: Building a Basic Contract:

# Imports

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Now that you know about Chainlink VRF v2 it’s time to begin building the raffle contract!
    </div>
  </div>
</ContentWrapp>

We will begin by declaring the Solidity compiler version and importing the code we need. There are 3 contracts we will be importing: LinkTokenInterface, VRFCoordinatorV2Interface, and VRFConsumerBase:

<Highlight class="language-javascript">
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
</Highlight>
