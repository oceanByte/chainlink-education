pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract VRFv2SubscriptionManager is VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;
  LinkTokenInterface LINKTOKEN;

  address vrfCoordinator = ;
  address link_token_contract = ;
  bytes32 keyHash = ;
  uint32 callbackGasLimit = ;
  uint16 requestConfirmations = ;
  uint32 numWords =  ;
