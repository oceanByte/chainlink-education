// SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

AggregatorV3Interface internal priceFeed;

constructor() public {
priceFeed =
AggregatorV3Interface();
}
}
