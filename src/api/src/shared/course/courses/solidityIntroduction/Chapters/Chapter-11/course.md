#####Chapter 11:

# Functions

<!-- <ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Connect your artwork to the price of gold or ETH or overall Market Cap. Mention the concept of “Hybrid Smart Contracts”. 
    </div>
  </div>
</ContentWrapp> -->

Thus far, we’ve mainly been concerned with storing data in variables and accessing that stored data. But what if we want to manipulate data? That is the realm of **functions**. You can write the logic in a function and have it manipulate data in an infinite number of ways. Solidity and the EVM are called [Turing Complete](https://stackoverflow.com/questions/7284/what-is-turing-complete "Turing Complete"), which essentially means they can solve any computational problem (although there’s no guarantee that it will complete within a reasonable amount of time). 

You can think of functions as little machines that take in data, run some logic and produce an output. The values that are input into functions are called **arguments**. The logic is put in the **body** of the function. If the function directly returns a value as an output of the function that output is called the **return** value. Finally, just like variables have access modifiers, functions also have **modifiers** (including access modifiers too). Some functions don’t take in any arguments. Some functions just run calculations to change some state variables or make a request to run other code (or to a Chainlink node!) Some functions don’t return a direct value and just run calculations based on storage variables, or make a request to run other code (or send a request to a Chainlink node!) Basically, functions can be customized to do anything.

To define a function, we first type the “function” keyword, define a name for the function and add a pair of parentheses beside the name as such:

<Highlight class="language-javascript">
function addNumbers()
</Highlight>

After this is complete you can define **parameters** for the function. Parameters are the name and types of the arguments we can input into the function. They are variables that only that function can access. For this example, we will define two parameters: 

<Highlight class="language-javascript">
function addNumbers(uint num1, uint num2)
</Highlight>

Now we can add any modifiers to the function. In this case we’ll simply add public for now:

<Highlight class="language-javascript">
function addNumbers(uint num1, uint num2) public
</Highlight>

Now we’ll define what the function returns. Remember a function doesn’t **have** to return anything. In this example we will add the parameters and return the result. Since we are adding two uints, the return value will also have to be a uint:

<Highlight class="language-javascript">
function addNumbers(uint num1, uint num2) public returns (uint)
</Highlight>

Finally we’ll create the function body by typing a pair of curly braces and typing our function logic within them:

<Highlight class="language-javascript">
function addNumbers(uint num1, uint num2) public returns (uint) {
 answer = num1 + num2;
 return answer;
}
</Highlight>

As you can see the function takes the two parameters, num1 and num2, sums them, stores the sum in a variable called answer, and then returns the value inside the variable answer.

So if we were to call the function, we could store the result in another variable:

<Highlight class="language-javascript">
storedAnswer = addNumbers(1,2)
</Highlight>

The variable storedAnswer would then contain the uint 3.

