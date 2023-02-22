#####Chapter 5: VRF Subscriptions

# Subscribing to the VRF
Just like all Chainlink powered services, we must pay the Chainlink VRF for the work completed by using the LINK token. In the past, in version one of Chainlink VRF, this involved sending a set amount of LINK tokens alongside each request. And because a contract itself sends out the requests, this meant that smart contracts had to be sent LINK before they could request a random number. 

## VRFv2
In VRFv2, the most recent version of the VRF, the concept of a subscription was added. What is a subscription? Essentially, it's an account created on the VRFCoordinator contract that can be funded with LINK tokens and points to "consumer" contracts that want to request randomness. Once a subscription is set-up a consumer contract can then request randomness, the VRF respondes with a random number and proof, and then after the random number is included on-chain the VRF is paid with some of the LINK prepaid in the subscription.

The power that comes from this subscription model is that now consumer contracts have much more flexibility in requesting random numbers. Before subscriptions it was a static price, and the VRF always returned a single random number. 
 
But what if the consumer contract needs more than one random number? The consumer contract can now specify how many random numbers it wants to request.  
 
What if the consumer contract needs the random number to be included very fast by paying a higher gas price? The consumer contract can now request how much it's willing to pay for gas. This is called the **gas lane**. 
 
What if the consumer contract needs to run some heavy calculations after recieving the random number? It can set a limit to how much gas will be spent by the VRF when submitting the random number. This is called the **callbackGasLimit**.

And because this is all pre-paid via the subscription, and credited from the subscription amount after the VRF has responded with a random number, the amount of LINK token to be paid to the VRF can be dynamic based on network conditions. When demand to get transactions into a blockchain is high, and thus gas prices are high, more LINK will be deducted to compensate the gas the VRF has to pay to get it's random number transaction on-chain. Or if you don't want the contract to request random numbers when the gas price is high, you can specify that via the Gas Lane. The more random numbers the contract requests at once the more expensive it will be. And finally the higher the computational load of the function the consumer contract runs when recieving a random number; the more gas it will cost for the VRF to submit a random number.

The subscription model added in Chainlink VRFv2 is a powerful tool, enabling any consumer contract requesting a random number to determine how it wants that random number! 