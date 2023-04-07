pragma solidity >=0.7.0 <0.9.0;

contract Event {
 // set the amount also as an indexed parameter
 event Log(address indexed sender, uint256 indexed amount);
 
 mapping(address => uint) public amounts;

 function foo() public {
  uint256 _amount = 100;
  amounts[msg.sender] = _amount;
  // emit the Log event in the next line
  emit Log(msg.sender, _amount);
 }
}
