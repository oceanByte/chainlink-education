#####Chapter 5:

# Function Modifiers

Now that we have learned how to execute code based on given conditions and our contracts grow in complexity, we will find ourselves in situations where we need to run some checks before we allow the execution of a function. Introducing function modifiers. Modifiers can be run before and/or after function calls. They can be used for example to restrict access or validate input.

<Highlight class="language-javascript">
contract ContractA {
   uint public x = 0;
   address public owner;
 
   constructor() {
       owner = msg.sender;
   }
 
   modifier onlyOwner() {
       require(msg.sender == owner, "Only owner allowed.");
       _;
       require(x < 42);
   } 
 
   function inc(uint value) public onlyOwner{
       x = x + value;
   }
}
 </Highlight>
 
Modifiers are defined using the **modifier** keyword followed by a function name. In the body of the function, we can run any Solidity code. Usually, we want to do some checks and if they are not met, we want to revert the transaction. If everything is alright, we can use the special keyword **_** to tell solidity to execute the called function. Once the function has finished, we could execute further code inside the modifier to do further checks before the transaction completes. In this example, if someone calls the inc function, it must be the contract owner and we do not allow x to be greater than 42.

The same modifier can be used for other functions by adding it to the header. We can also define multiple modifiers and run them in successive order for the given function.

 <Highlight class="language-javascript">
contract ContractA {
  uint public x = 0;
  address public owner;
  constructor() {
      owner = msg.sender;
  }
  modifier onlyOwner() {
      require(msg.sender == owner, "Only owner allowed.");
      _;
      require(x < 42);
  }
 
  modifier maxValue(uint value) {
      require(value <= x, "Value must be smaller or equal to x.");
      _;
  }
  
  function inc(uint value) public onlyOwner {
      x = x + value;
  }
 
  function dec(uint value) public onlyOwner maxValue(value) {
      x = x - value;
  }
}
 </Highlight>

See how we defined a new function called dec and added a new modifier maxValue. We can simply pass it a value in the function that uses the modifier. And we only allow the caller to use values equal to or smaller than x.
