#####Chapter 4:

# Conditional statements and loops

While we are now familiar with storage and basic data types in Solidity, we still have to learn about flow control. We will often run into situations where we need to decide the next step based on the value of a variable. This is where we can use conditional statements. The syntax is very similar to languages like JavaScript. Let’s have a look:

<Highlight class="language-javascript">
function foo(int x) public pure returns (uint) {
 if (x < 5) {
   return 0;
 } else if (x < 10) {
   return 1;
 } else {
   return 2;
 }
}
</Highlight>

As you can see, this allows us to execute different codes based on if a condition is met. If we do not have an else if case but a simple if/else case, Solidity also supports the ternary operator.

<Highlight class="language-javascript">
function bar(uint x) public pure returns (uint) {
  return x < 5 ? 0 : 1;
}
</Highlight>

The question mark **?** is called the ternary operator (learn more about operators in chapter 10). The expression means if x is smaller than 5 then return 0 otherwise return 1. We can also use these conditional statements to assign values to a variable:

<Highlight class="language-javascript">
function bar(uint x) public pure returns (uint) {
  uint conditionalResult = x < 5 ? 0 : 1;
  return conditionalResult;
}
</Highlight>

Here we are using the ternary expression to assign the value to the local variable called **conditionalResult**.

Next, to flow control, we often encounter a situation where repetition is needed. Loops are useful when we must repeat a block of code several times. Solidity offers two types of loops. For Loops and While Loops.

<Highlight class="language-javascript">
function forLoopExample() public returns (uint) {
  uint counter = 0;
  for (uint i = 0; i < 4; i++) {
      if (i == 0) {
          continue;
      }
      if (counter == 4) {
          break;
      }
      counter = counter + 2;
  }

return counter;
}
</Highlight>

As in JavaScript, we have the same syntax for the for loop: (initialization; condition; increment). The condition is an expression checked at the end of each loop cycle. You can also see that we are using the keywords **continue** and **break** here. They allow us to control the flow inside the loop. If a particular condition is met, we can skip the rest of the loop by using **continue**. So everything that would be executed after **continue** will be ignored. We can also completely exit the loop by using **break**. This is useful when we are looking for a specific condition to be met and do not need to run the loop anymore.

Next to the for loop, we also have a while loop that can be used. It is similar to the for loop that it has a condition that is tested each time the loop repeats. But the variable declaration is happening outside the loop header and incrementation is happening inside the loop body. One must be very careful not to forget to increment the index to meet the defined condition, or the loop may run forever.

<Highlight class="language-javascript">
function whileLoopExample() public {
  uint index;
  while (index < 4) {
      index++;
  }
}
</Highlight>

Always ensure you do not create a situation where your contract might get stuck when using loops. Imagine you have a dynamic array in storage that will grow over time as new values are added to it and some function is using a loop to iterate through the full array. You might run into a situation where loop iteration will hit the block's gas limit. This would result in an error and make it impossible for that function to complete that loop except you can somehow reduce the array size. So always take care when updating storage values in a loop!

You might think that for view and pure functions, you do not have to worry about this aspect, as nothing is added to a block and the state is read from the blockchain. And this is true as long as you call them directly. But if a non-pure/non-view function calls such a function, then gas is consumed and we might run into the same problem we just described.
