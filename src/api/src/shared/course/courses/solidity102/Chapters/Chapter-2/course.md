#####Chapter 2:

# Storage

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

As we learned in the previous chapter, Ethereum could be described as a state machine. Transactions are then used to transition from one state to another state. The transactions are stored into individual blocks. These blocks are linked to each other creating the Ethereum blockchain. Everyone can take these transactions and follow the transition rules resulting in the same state for everyone.
But how can someone read data from the blockchain within a smart contract? And how can we add new (custom) data to the blockchain?

We can use the EVM for this and we program the EVM using Solidity (see solidity101, chapter 2 for more details). Solidity offers us three different locations to store our variables. As block size is limited in Ethereum, every bit counts and we should know how these different ways of storing data affect storage capacity. Variables can be declared as **storage**, **memory** or **calldata** to specify the location of the data. In this course, we will only focus on storage and memory. Calldata and the stack will be covered in a future course.

**Storage** variables are also known as state variables. These variables are mutable though their location is persistent. This means that data will persist between function calls. As block space is very valuable, storage variables are arranged in a compact way into storage slots into blocks of 32 bytes. Variables that take less than 32 bytes are combined into the same slot. Taking the least amount of space. Data is stored in order of the declaration in the contract in successive order. So we have slot 0x0, slot 0x1, slot 0x2, and so on.

```Solidity
contract StorageExample {
    uint256 nubmerOne = 1; // slot 0x0
    string customGreeting = "Hello Chainlink"; // slot 0x1
    uint256 numberTwo; // slot 0x2

    string constant greeting = "Hello World"; // no storage

    bool active; // slot 0x3
    bool admin; // slot 0x3
    bytes16 foo; // slot 0x3
    bytes16 bar; // slot 0x4
}
```

As you can see here, **numberOne**, **customGreeting** and **numberTwo** each take a full slot as they cannot be combined to consume less space. And constant variables (greeting) are not stored in storage slots. When a constant state variable is read the EVM uses the assigned value instead. the booleans active and admin just take 1 bit each and bytes16 takes 16 bits, so a total of 18 bits. That’s why they are all stored in slot 0x3. The last bytes16 variables bar takes another 16 bits but cannot be stored in slot 0x3 because the max size is 32 bytes. So a new slot is occupied.

Dynamic-sized arrays and structs are handled a little differently though as the size is unknown at the point of declaration. They always start with a slot that takes 32 bytes and their elements are stored in a different storage slot. The beginning of this storage slot is computed using a Keccack-256 hash.

**Memory** variables live only in memory and exist in the scope of a function. They are mutable inside that scope but cannot be called outside of the function. Once a function execution is completed, all variables in memory are released.

```Solidity
function add(uint256 a, uint256 b) pure returns(uint256) {
    uint256 result = a + b;
    return result;
}
```

Any manipulations done to memory variables is not written into the blockchain resulting in less gas consumption. So this is why we always need to ask if we need persistence.

There is an exception though as arrays, structs and mappings are stored in storage. This is important to remember as it might introduce critical bugs into your code when not considered. We will learn more about these data types in the upcoming chapters.
