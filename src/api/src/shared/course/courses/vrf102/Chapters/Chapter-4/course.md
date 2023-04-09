#####Chapter 4:

# Goldberg's Verifiable Random Function

As we have seen in the previous chapters, randomness is a non-trivial problem that needs proper consideration and analysis to ensure that the randomness is unpredictable. One of Chainlink's VRF v2 core features is based on scientific research and implements Goldberg's Verifiable Random Function (see details [here](https://eprint.iacr.org/2017/099.pdf)). Goldberg defines VRF as the public-key version of a keyed cryptographic hash. Anyone with the corresponding public key can verify the correctness of the hash. But only the holder of the secret VRF key can compute the hash. The VRF created by Goldberg et al. is being standardized by IETF and used by others in production (e.g., Algorand). It provides an "entirely unpredictable (uniformly distributed) to anyone who doesn't know the seed or secret key."

Let's understand this better. You can imagine VRF as a public-key pseudorandom function. It can be used to prove that the output was calculated for that given function. But only the owner of the secret key can compute the output for any given input value. Others can use the public key to check if the output was calculated using the given function. So it allows us to produce unpredictable (and uniformly distributed) results while being fully verifiable.

In Chainlink, a contract provides a seed (via an Ethereum log) to generate a random number. The oracle hashes this input to get a cryptographically secure random sample from secp256k1 using the block data and the oracle's public key. This is the base to use the VRF to create a random number. The oracle then sends back the proof with the public key, the input seed (and some additional values for the signature). Afterwards, it gets verified by the VRF machinery and is sent to the consuming contract if it is correct. The random number is then published on-chain with proof that it was generated using the VRF.

