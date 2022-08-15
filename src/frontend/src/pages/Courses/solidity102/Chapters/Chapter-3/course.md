#####Chapter 3:

# Mappings

Mappings are used to create key-value maps. The key can be any built-in value type like bytes, address or string. The value can be any type including another mapping and array. Mappings are not iterable, so you must know the key to retrieve the value. They are often used to associate an Ethereum address with a value. Mappings can be confusing initially, so let’s focus on understanding the code here.

You must define mapping using the following syntax: mapping(key => value) <access specifier> <name>

Now let’s assume that we want to assign an address a value. We would write it like this:

<Highlight class="language-javascript">
mapping(address => uint) public amount;
</Highlight>

So we have a key of the data type address associated with a value of data type uint. And we give this mapping the variable name balances. Next, we will write a simple set function to add a value to this variable.

<Highlight class="language-javascript">
function set(address \_address, uint \_value) public {
  amount[\_address] = \_value;
}
</Highlight>

This function allows someone to set a positive integer as a value for the provided address. It’s that simple!

We do not need to write a custom get function as Solidity automatically provides us with a getter function. But this is how such a getter function would look like so that you can better understand how to read values from a mapping:

<Highlight class="language-javascript">
function get(address \_address) public view returns (uint) {
  return amount[\_address];
}
</Highlight>

So, the syntax looks similar to accessing a value from an array. But what happens when we provide an address that does not exist in the mapping? Solidity will simply return the default value which is 0. So it will not throw an error.

This is also how we can delete values from a mapping. We can simply set it to the default value. Solidity offers us the delete keyword to do this properly.

<Highlight class="language-javascript">
function remove(address \_address) public {
  delete amount[\_address];
}
</Highlight>

Now can further complicate this as we can also use other mappings as a value resulting in nested mappings.

<Highlight class="language-javascript">
mapping(address => mapping(uint => bool)) public nestedMapping;
</Highlight>

This can be confusing when reading for the first time. So let’s try to understand better what we can see here. We have an address (our key) that points to another mapping (our value). This other mapping uses a uint (our key) to point to a boolean (our value). We can imagine a mapping like boxes with labels and inside you have a value. For nested mappings, we have boxes with labels (the addresses); inside each box, there are more little boxes using a uint as a label. If we open one of them, we will find a boolean.

To set the value of a nested array, we must provide the address and the uint which works like an index.

<Highlight class="language-javascript">
function set(address \_address, uint \_index, bool \_foo) public {
  nestedMapping[\_address][\_index] = \_foo;
}
</Highlight>

Retrieving a value works just as easy. We only need to provide the two keys (\_address and \_index):

<Highlight class="language-javascript">
function get(address \_address, uint \_index) public view returns (bool) {
  return nestedMapping[\_address][\_index];
}
</Highlight>

The same rules as for non-nested mappings apply here. We do not need to define a get function for nested functions. Solidity does this for us. And if the value does exist, we will simply get a default value.
