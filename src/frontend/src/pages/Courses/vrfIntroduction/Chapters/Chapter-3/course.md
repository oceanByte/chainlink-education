#####Chapter 3:

# Chainlink VRF

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     So you’ve realized that you need Chainlink VRF to build your raffle. But what makes Chainlink VRF so special?
    </div>
  </div>
</ContentWrapp>

As discussed in the previous lesson randomness provided by an outside service needs to be verifiable and decentralized, and that’s exactly what Chainlink VRF is! VRF stands for Verifiable Randomness Function. Essentially Chainlink VRF provides cryptographic proof alongside every random number generated, that the random number wasn’t tampered with (and indeed generated in a random way).

How does this cryptographic proof work? It’s quite mathematically complicated and outside the scope of this lesson, but you can read more about it in the “Technical Walkthrough” section of this [blog post](https://blog.chain.link/chainlink-vrf-on-chain-verifiable-randomness/). The cryptographic proof is then verified by a smart contract on-chain, which means it is verified by every node on the blockchain! This completes our verifiable and decentralized criteria. So now we understand that Chainlink VRF is verifiably random and decentralized how do we use it?
