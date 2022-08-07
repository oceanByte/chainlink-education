#####Chapter 9:

# Reading Array Values

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

Now that we can store multiple related values into a single array our lives organizing our data should be much easier! But how do we access those stored values later? Data stored in arrays is associated with an index which describes the order of the data. Indexing in Solidity starts at 0. So this means the first values assigned to an array has the index of 0, the second value assigned to the array has an index of 1, the third value an index of 2 and so on.

You can access the values in an array by calling the array variable and putting the index of the value you want to access within square brackets. For example:

<Highlight class="language-javascript">
string[] myBooks = [ “Mastering Ethereum”, “Programming Rust”, “Zombie Survival Guide”]
</Highlight>

And then

myBooks[0] will access the first value assigned to the myBooks array (since Solidity indexes at 0) which will be the value “Mastering Ethereum”.

As another example I could take a value in an array and also assign it to another variable:

<Highlight class="language-javascript">
string myFirstBook = myBooks[0];
</Highlight>

Which will take the value indexed at zero in the “myBooks” array (which is “Mastering Ethereum”) and assign it to the string named “myFirstBook”. This won’t erase it from the myBooks array but make a copy and assign to the new “myFirstBook” variable.

