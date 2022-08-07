#####Chapter 2:

# EVM Intro

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
    When someone says the data is stored on the blockchain, what does it actually mean from a perspective of a smart contract? Where is the data stored? How is it stored?
    </div>
  </div>
</ContentWrapp>

As we learned in the previous chapter, the data is stored in the blockchain as a state. And a smart contract can be considered a program that is used to maniuplate this state. Now varialbes in a smart contract are stored in different ways.
Variables can be declared as **storage**, **memory** or **calldata** to specify the location of the data.

- **storage** variable is a state variable (stored on the blockchain)
- **memory** variable lives only in memory and it exists while a function is being called
- **calldata** contains function arguments

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DataLocations {
    uint[] public arr;
    mapping(uint => address) map;
    struct MyStruct {
        uint foo;
    }
    mapping(uint => MyStruct) myStructs;

    function f() public {
        // call _f with state variables
        _f(arr, map, myStructs[1]);

        // get a struct from a mapping
        MyStruct storage myStruct = myStructs[1];
        // create a struct in memory
        MyStruct memory myMemStruct = MyStruct(0);
    }

    function _f(
        uint[] storage _arr,
        mapping(uint => address) storage _map,
        MyStruct storage _myStruct
    ) internal {
        // do something with storage variables
    }

    // You can return memory variables
    function g(uint[] memory _arr) public returns (uint[] memory) {
        // do something with memory array
    }

    function h(uint[] calldata _arr) external {
        // do something with calldata array
    }
}
```
