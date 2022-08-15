#####Chapter 6:

# Errors

In the previous chapter, we learned about function modifiers. We already used the keyword **require** to check for conditions. If a condition is not met, an error is raised. An error will revert all changes made to the state during a transaction. There are three different ways to throw an error: **require**, **revert** and **assert**.

We use require if we want to validate user input and return values from calls to other functions. The syntax asks for a condition and a custom error message as the second argument. If the condition is not met, an error is raised. Otherwise, the next line will be executed.

<Highlight class="language-javascript">
require(x <= 42, "x must be smaller or equal to 42.");
</Highlight>

**Revert** is used in a similar fashion but directly throws an error without checking a condition. It is useful when the condition check is more complex and you do not want to do it in a single line to improve readability or if several conditions have to be met that you want to check one by one. It will return all remaining gas to the caller. You can call it like this:

<Highlight class="language-javascript">
if (x <= 42 && x > 0) {
  revert("x must be greater than 0 and smaller or equal to 42");
}
</Highlight>

**Assert** is used for internal logic and checks code that should never be false. If an assertion fails, it’s likely that there is a bug in the contract. We can use asserts to ensure that even if there is a bug, we can simply catch it here and make it more difficult to abuse the bug. For example, it is often used to check for overflow/underflow. The following code shows how can ensure that a is always bigger or equal to b so that we do not run into a situation causing an underflow.

<Highlight class="language-javascript">
uint c = a - b 
assert(a >= b);
</Highlight>
