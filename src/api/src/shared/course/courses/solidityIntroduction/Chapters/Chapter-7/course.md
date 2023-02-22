#####Chapter 7:

# Access Modifiers

<!-- <ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Chainlink can be used for a lot more than dynamic NFTs. Whenever you need to connect the off-chain world to the on-chain world, Chainlink is the perfect solution.  
    </div>
  </div>
</ContentWrapp> -->

We can actually give more information to the Solidity compiler on how we want to use our variables (and later functions). We can tell the compiler how we want our variables to be accessed. Many blockchains, such as Ethereum, act as one monolithic computer. While Ethereum is a network of computers distributed around the world, when you deploy code to a blockchain like Ethereum, that code can access any other code anyone has deployed to that blockchain. This is like how programs downloaded to your computer can access other programs on your computer. This allows smart contracts to interact in many unique and interesting ways that regular web application back ends may not be able to do so easily. However, this can also open risks of other code using our code in unintended ways.

To help prevent this we can declare “access modifiers” when declaring our variables, which limit what code on the blockchain can access and change those variables. The four types of variable access modifiers are:


* Public 
    * The variable/function can be accessed or changed by any other code or wallet on the blockchain.
* Private
    * The variable/function can only be accessed or changed within the current contract
* Internal
    * The variable/function can only be accessed or changed within the current contract or any other contract that inherits the current contract (we’ll discuss inheritance in another lesson)
* External
    * The variable/function can only be accessed/changed from outside code or blockchain wallets

To declare the access modifier of a variable we put it inbetween the function type and name like this:

<Highlight class="language-javascript">
uint public myFavNum;
</Highlight>

If no access modifier is declared then the variable is automatically assigned the private modifier. For example

<Highlight class="language-javascript">
uint myFavNum;
</Highlight>
 
Is equivalent to 

<Highlight class="language-javascript">
uint private myFavNum;
</Highlight>
