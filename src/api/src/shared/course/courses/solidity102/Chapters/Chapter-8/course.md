#####Chapter 8:

# Inheritance

As our contracts grow in complexity, we want to split our code further and make it easier to maintain. This helps with isolated testing increasing the security of the individual contracts. But Inheritance can become very complex as it hides dependencies as you can inherit from contracts that inherit from other contracts. So we must take care when using it.

Solidity supports multiple inheritances we can use to derive from other contracts using the is keyword. Parent contracts must be listed in the order from “most base-like” to “most derived” as the order of inheritance matters. Child contracts can override parent functions using the override keyword if the parent contract is allowed using the virtual keyword for the given function. So Solidity allows for polymorphism.

<Highlight class="language-javascript">
 contract A {
  function foo() public pure virtual returns(string memory) {
    return "A";
  }
}
 
contract B is A {
  function foo() public pure override returns(string memory) {
    return "B";
  }
}
 
contract C is A {
  function foo() public pure virtual override returns(string memory) {
    return "C";
  }
}
</Highlight>

Functions can be overridden as long as the function signature remains the same. A derived contract can also access all non-private members like state variables and internal methods. This is especially helpful when having functions that are needed repeatedly but that you do not want to define and implement for each contract.

Child contracts can inherit from multiple parent contracts. And there might be cases where you want to do something custom for a specific contract but also call the function from the parent contract. We can use the super keyword here.

<Highlight class="language-javascript">
contract D is B, C {
  function foo() public pure override(B, C) returns(string memory) {
    return super.foo();
  }
}
</Highlight>

When an overridden function is called, parent contracts are executed from right to left and depth-first. So in this case D.foo() would return “C” since C is the last contract that we have defined in the override function.

Inheritance can lead to critical errors as it hides complexity and implementation details. But it is also helpful to organize your code in a way where you can inherit functions, state variables and function modifiers to be used in other contracts.
