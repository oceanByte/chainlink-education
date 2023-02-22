#####Chapter 5:

# Contract State, Variables and Data Types

<!-- <ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Now you want to connect your artwork to the physical (off-chain) world. Tell your artwork how to behave. 
    </div>
  </div>
</ContentWrapp> -->

Programs, in very broad terms, do two things: store data and change data. We store data in programs by utilizing **variables** and change data by defining logic in **functions**. In smart contracts, when we define variables outside of a function they can be used to store data for that contract, to be accessed at a later time. When defining a variable, you must give it a **name** and **type**. You can name the variable whatever you want, as long as it isn’t used more than once. The variable **type** describes what kind of data were are storing. Is it an integer to do math on? Is it simply a yes or no (1 or 0)? Is just a sentence meant to be read? Some important data types in Solidity are:



* int: Integers (...-3,-2,-1,0,1,2,3…)
    * These are whole numbers and can be negative.
* uint: Unsigned Integers (0,1,2,3…) 
    * These are whole numbers and must be positive.
* string: Strings (“Hello my name is Glados. The cake is a lie. I like the number 17”)
    * These are phrases that meant to be read. You can store numbers in a string but you can’t do math on those numbers.
* bool: Booleans (0 or 1)
    * A boolean is a variable that can only be 0 or 1. You can also think of these as false (0) and true (1).
* address: An Account Address (0xa345643f1….e13)
    * An address represents an accout on Ethereum as a hexadecimal number beginning with 0x. These can be wallet accounts (also known as Externally Owned Accounts or EOAs) or contract accounts (the address where contracts can be found on the blockchain).

There are more but we can learn more about them later, these are the major ones for now! Once a variable is assigned a type, it’s type can’t change.

An example variable declaration would be: 

<Highlight class="language-javascript">
uint myFavNum;
</Highlight>

This creates a variable called “myFavNum” and assigns it the type uint, or unsigned integer. Now we can use myFavoriteNumber to store numbers like 0,1,2,3,4…etc. in our contract. 
