#####Chapter 2:

# Randomness and Blockchains

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Upon research, you realize popular languages like Javascript have built-in randomness functions maybe you can use something like that in Solidity? 
    </div>
  </div>
</ContentWrapp>

Blockchains are deterministic, meaning that any computations that use blockchains must have predictable outcomes. This so all of the nodes that run the blockchain can come to an agreement on what the blockchain is. But deterministic runs counter to random. If everyone knows what the next hand of poker will be before it is dealt it wouldn’t be considered random. So if randomness is impossible on a blockchain, how can we bring the awesome powers of smart contracts to any applications that need randomness?

We could get the randomness from an outside resource! But it can’t be a trusted centralized service (as discussed in Chainlink 101), or we would be ruining the decentralized properties of blockchains and smart contracts. And it would be great if it could be verified that the number wasn’t tampered with and is genuinely random. This is a perfect example of where a decentralized oracle network powered by Chainlink could be used!
