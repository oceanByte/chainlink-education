#####Chapter 4:

# Conditional Statements

While we are now familiar with the basic data types in Solidity, we still have to learn about conditional statements. Because we will run often into situations where we need to decide based on the value of a variable, we will need to use conditional statements. Solidity offers a number of conditional statements that can be used to decide what to do based on the value of a variable. It is very similar to if statements in other languages like C++.

<Highlight class="language-javascript">
function simple(uint x) public pure returns (uint) {
  if (x < 10) {
    return 0;
  } else if (x < 20) {
    return 1;
  } else {
    return 2;
  }
}
</Highlight>

<Highlight class="language-javascript">
  function ternary(uint _x) public pure returns (uint) {
        // shorthand way to write if / else statement
        // the "?" operator is called the ternary operator
        return _x < 10 ? 1 : 2;
    }
</Highlight>
