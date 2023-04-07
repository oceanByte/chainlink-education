mapping(address => mapping(uint => bool)) public nestedMapping;

// implement the delete function
function remove(address _address, uint _index) public {
  delete nestedMapping[_address][_index];
}
