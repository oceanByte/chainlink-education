#####Chapter 7: Building a Basic Contract

# Configuring Subscription Settings

Chainlink VRF allows you to customize several randomness parameters.

**uint64 s_subscriptionId**: The subscription ID that this contract uses for funding requests. We just need to declare this variable and it will be set later.

**address vrfCoordinator**: The address of the Chainlink VRF Coordinator contract. We will use the Rinkeby coordinator address **0x6168499c0cFfCaCD319c818142124B7A15E857ab**

**address link**: The LINK token address for your selected network. We will use the Rinkeby LINK address **0x01BE23585060835E02B77ef475b0Cc51aA1e0709**

**bytes32 keyHash**: The gas lane key hash value, which is the maximum gas price you are willing to pay for a request in wei. It functions as an ID of the off-chain VRF job that runs in response to requests. We will use **0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc**

**uint32 callbackGasLimit**: The limit for how much gas to use for the callback request to your contract's **fulfillRandomWords()** function. It must be less than the **maxGasLimit** limit on the coordinator contract. In this example, the **fulfillRandomWords()** function stores two random values, which cost about 20,000 gas each, so a limit of 100,000 gas is sufficient. Adjust this value for larger requests depending on how your fulfillRandomWords() function processes and stores the received random values. If your **callbackGasLimit** is not sufficient, the callback will fail and your subscription is still charged for the work done to generate your requested random values. We will use a limit of **100000**.

**uint16 requestConfirmations**: How many confirmations the Chainlink node should wait before responding. The longer the node waits, the more secure the random value is. It must be greater than the **minimumRequestBlockConfirmations** limit on the coordinator contract. We will set this to **3**
**uint16 numWords**: How many random values to request. If you can use several random values in a single callback, you can reduce the amount of gas that you spend per random value. The total cost of the callback request depends on how your **fulfillRandomWords()** function processes and stores the received random values, so adjust your **callbackGasLimit** accordingly. We will set this to **2**
