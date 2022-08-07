#####Chapter 3:

# Mappings

Mappings are used to create key-value maps. The key can be any bult-in value type, bytess, string or any contract. The value can be any type including another mapping and array. Mappings are not iterable, so you must know the key to retrieve the value.

<Highlight class="language-javascript">
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Mapping {
// Mapping from address to uint
mapping(address => uint) public myMap;

function get(address \_addr) public view returns (uint) {
// Mapping always returns a value.
// If the value was never set, it will return the default value.
return myMap[_addr];
}

function set(address \_addr, uint \_i) public {
// Update the value at this address
myMap[_addr] = \_i;
}

function remove(address \_addr) public {
// Reset the value to the default value.
delete myMap[_addr];
}
}
</Highlight>

<Highlight class="language-javascript">
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract NestedMapping {
// Nested mapping (mapping from address to another mapping)
mapping(address => mapping(uint => bool)) public nested;

function get(address \_addr1, uint \_i) public view returns (bool) {
// You can get values from a nested mapping
// even when it is not initialized
return nested[\_addr1][_i];
}

function set(
address \_addr1,
uint \_i,
bool \_boo
) public {
nested[\_addr1][_i] = \_boo;
}

function remove(address \_addr1, uint \_i) public {
delete nested[\_addr1][_i];
}
}
</Highlight>
