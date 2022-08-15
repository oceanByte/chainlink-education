#####Chapter 9:

# Constructors

It is likely that you want to deploy the same contract with different initial values. Until now, you only learned how to set initial values. So you would always need to write a new contract with updated initial values in the Solidity code. This is unpractical. Fortunately, Solidity offers a constructor, a special function executed upon contract creation.

<Highlight class="language-javascript">
contract Foo {
uint public amount;
   constructor(uint _amount) {
       amountFoo = _amount;
   }
}
 
contract Bar {
uint public amount;
   constructor(uint _amount) {
       amountBar = _amount;
   }
}
</Highlight>

There can only be one constructor per contract and a constructor is defined using the constructor keyword. The arguments are passed during contract creation, allowing us to set initial values for the state variables. There is always a constructor in place. If you do not define one, there is a default constructor. Once the contract is created, the code is deployed on the blockchain.

Child contracts inhering from a parent contract can also call their parent constructors. You can do this either directly when defining the contract or in the child contract constructor:

<Highlight class="language-javascript">
contract A is Foo(42) {
}
 
contract B is Bar {
  constructor(uint \_amount) Bar(\_amount) {}
}
</Highlight>

It is important to note that parent constructors are always called in order of inheritance. So if you use the child constructor to pass the values, you should always check the order of inheritance They are always called from right to left. Let’s look at an example:

<Highlight class="language-javascript">
contract C is Foo, Bar {
 constructor() Bar(5) Foo(42) {}
}
</Highlight>

So here the constructor of Bar is called first with the value 5, then the Foo constructor is called with the value 42 and then the constructor of C is called. Remember this when using constructors because it might introduce weird behavior to your contracts if you have a different assumption.
