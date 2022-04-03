#####Chapter 7: Building a Basic Contract

# The Constructor

Constructors are logic that is run whenever a smart contract is first deployed to a blockchain. We will set the constructor to the following values:

```
constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    LINKTOKEN = LinkTokenInterface(link);
    s_owner = msg.sender;
    s_subscriptionId = subscriptionId;
  }
```
