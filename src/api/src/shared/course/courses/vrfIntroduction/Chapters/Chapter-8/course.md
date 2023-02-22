#####Chapter 8: Building a Basic Contract

#Setting Storage Variables

For this example we will store the latest random numbers the contract recieves. Every request also generates a "requestId" which uniquely identifies every request sent and we will also store the latest requestId. To do this we will create two storage variables; one for the latest random numbers called s\_randomWords and one for the latest requestId called s\_requestId. Finally we will be creating a subscription for our contract when we deploy it and we will create a variable of type address to store the wallet address of the wallet that owns the subscription.

<Highlight class="language-javascript">
  uint256[] public s_randomWords;
  uint256 public s_requestId
  address s_owner;
</Highlight>

The s\_randomWords variable is an array of uint256's because we can request multiple random numbers at once. The variable s\_requestId is just a single uint256, because every request will only generate a single requestId.