#####Chapter 6:

# Assigning Variables Values

<!-- <ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Now that you understood how to connect the off-chain world you can utilize this knowledge now for your NFT. Imagine a NFT that reacts to the price of Ethereum. It could rain when the price falls and it could be sunny when the price rises.
    </div>
  </div>
</ContentWrapp> -->

In the last activity we created a variable called “myFavoriteNumber” of type uint, but what if we want to actually store a value in that variable? That’s what the equal sign ( = ) “assignment” operator is for. In programming an operator is a symbol that represents an action or process. In the case of the assignment operator whatever is to the left of the equals sign is being assigned the value of whatever is on the right of the equal sign. For instance if we had:

<Highlight class="language-javascript">
uint myFavNum; 
myFavNum = 42;
</Highlight>


In the first line we are creating the variable “myFavoriteNum” of type uint, and then in the second line we are assigning “myFavoriteNum” the value 42. So my “myFavNum” will stay 42 until we change it again! Also reminder we put a semi-colon at the end of every complete line. Another example:

<Highlight class="language-javascript">
uint myFavNum; 
myFavNum = 42; 
myFavNum = 7;
</Highlight>

In the first line we are creating the variable “myFavoriteNum” of type uint, and then in the second line we are assigning “myFavoriteNum” the value 42. Then in the third line we are now assigning “myFavoriteNum” the value 7 which overwrites the previous value.

You can declare a variable and assign it a value all in one line like this:

<Highlight class="language-javascript">
uint myFavNum = 42;
</Highlight>

Finally to assign a value to a variable of type string you must put the value in quotation marks (they can be either double or single quotes). For example:

<Highlight class="language-javascript">
string favPhrase = “We live in a society”;
</Highlight>
