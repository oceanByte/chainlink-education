#####Chapter 3:

# Randomness and Blockchains

Blockchains heavily rely on cryptography and randomness for security. The most straightforward example is the creation of key pairs used to do transactions. When you create a new key pair, a random number is needed as the initial input. We have learned in the previous example how to obtain this number from, e.g., the physical world. This number is then used to calculate a seed which is further used to derive all further key pairs.

This works well for key creation, but how to use random numbers on-chain? While the initial number could be completely random, as soon as you add it to a transaction, everyone who observes the mempool can see it. And also, the miners/validators can see it and decide how to deal with your transaction based on the number. This also would mean that someone controls the creation of the random number. So you must trust this source. So the random number cannot be created on-chain and must be provided from the outside. Is there no other way?

You might argue that you can use the content of a block as a source of randomness. But these values can be actively manipulated by miners. They could add or remove transactions to find a result that benefits them. In addition, blocks also have particular properties that could reduce the search space to calculate probabilities that a specific number will be selected. So this is an insecure way of creating random numbers.

So if you cannot trust the miners, you could argue for using Oracles. A trusted third-party system could be used to create random numbers and then provide them to services via an oracle. But depending on the economic incentive, someone could be interested in hacking this system to provide non-random numbers as input. And while they might use a true random number generator, you don’t know for sure and do not have any way to check the validity of such a statement once the number was generated.

So we must address two further issues here. The single point of failure (single oracle) and validating that the number was generated with a particular function. For the first issue, you could argue that you could use decentralized oracle network (DON). So it wouldn’t be a single oracle that we need to trust.
But how do we know this DON is not generating numbers based on certain conditions? For this reason, Verifiable Random Functions are used. They allow everyone to verify that a specific VRF was used and that the number was produced by a particular VRF and no other function. This allows us to generate verifiable random numbers for on-chain usage in a decentralized way.
