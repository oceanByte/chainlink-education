#####Chapter 9: Building a Basic Contract

# The Constructor

Constructors are logic run whenever a smart contract is first deployed to a blockchain. We will set the constructor to the following values:

<Highlight class="language-javascript">
constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    LINKTOKEN = LinkTokenInterface(link);
    s_owner = msg.sender;
    s_subscriptionId = subscriptionId;
  }
</Highlight>

Let's break down this constructor. It takes one parameter, subscriptionId, which is the ID of the subscription we will set up in a later chapter. It then passes the address stored in the vrfCoordinator to the VRFConsumerBaseV2 contract's constructor to set it up. 

The COORDINATOR variable is set to the VRFCoordinatorV2Interface and initialized to the address stored in the vrfCoordinator.

The LINKTOKEN variable is set to LinkTokenInterface, which we imported, and the interface is initialized with the link token address we specified earlier.

The s\_owner variable is set to msg.sender, which is the wallet account address that will deploy the contract.

The s\_subscriptionId is set to subscriptionId, which we fed into the constructor as a parameter.