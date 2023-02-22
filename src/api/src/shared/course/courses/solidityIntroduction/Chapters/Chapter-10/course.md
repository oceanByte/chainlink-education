#####Chapter 10:

# Structs

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

We’ve gone over storing data as variables, some of the significant fundamental variable types, and how to store data in arrays. But what if we want to create a custom type? That type could be composed of several other fundamental types. For instance, we could have our custom type store a string and a number. We can create these custom, complex types, and they are called **structs**.

You can define a struct by declaring the struct keyword, naming the struct, then putting the structure of the struct within curly braces. For example, we could define a struct called “Car” composed of three fundamental types: a string for the make, a string for the model, and a uint for the VIN. This is how we would define this struct:

<Highlight class="language-javascript">
struct car {
  string make,
  string model,
  uint VIN
}
</Highlight>

And boom, we have created a new type called “Car” we can use throughout our code. Now to assign a variable to this type is a little different from one of the fundamental data types. We must use syntax like this:

<Highlight class="language-javascript">
car myNewCar = car(“Tesla”, “Model 3”, 31223);
</Highlight>

To access information from a struct, you need to use “dot” notation. For example, to get the Model of the myNewCar variable, the syntax will look like this:

<Highlight class="language-javascript">
myNewCar.model;
</Highlight>

So, if we wanted to assign the value inside the model element of the myNewCar struct to another variable it could look like this:

<Highlight class="language-javascript">
string myNewCarModel = myNewCar.model;
</Highlight>

