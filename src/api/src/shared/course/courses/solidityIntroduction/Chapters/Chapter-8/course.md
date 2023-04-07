#####Chapter 8:

# Creating Arrays

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

It is common in programming to want to store many associated values together. For instance I may want to store the title of every book I own. We could put each book title in it’s own variable of type string, but it would be difficult to access all those variables at once, and keep track of each variable when I need to read this information. So instead we can store the book titles in an **array** of type string. What is an array? It’s many related pieces of data stored together in a single variable!

Just like regular variables arrays can only store one type of data, but can have multiple values of that type stored within it. To declare a variable as an array, we put square brackets next to the type of the variable. For example:

<Highlight class="language-javascript">
string[] myBooks;
</Highlight>

Creates a variable called “myBooks” which is an array of strings.

You can then assign multiple values to the array by using the assignment operator. The difference from a regular variable assignment is that on the right side of the assignment operator you put the values you want in-between square brackets and separate each value by a comma for example:
<Highlight class="language-javascript">
string[] myBooks = [ “Mastering Ethereum”, “Programming Rust”, “Zombie Survival Guide”]
</Highlight>

Or 

<Highlight class="language-javascript">
uint[] numbers;
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
</Highlight>

You can limit the amount of values that can go into the array by putting a number in the brackets by the array type when you declare it. For example:

<Highlight class="language-javascript">
uint[6] numbers;
</Highlight>

Limits the amount of values that can fit into the array called “numbers” to a max of 6 values.

