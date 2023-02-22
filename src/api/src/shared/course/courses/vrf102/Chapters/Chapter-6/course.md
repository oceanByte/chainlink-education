#####Chapter 6:

# VRF On-Chain Considerations

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Now that you know about Chainlink VRF v2 it’s time to give you some practical advise.
    </div>
  </div>
</ContentWrapp>

While it’s effortless for Chainlink’s VRF to utilize on-chain randomness for your smart contract, it does not mean there are no pitfalls or potential attack vectors. Let’s explore how validators could potentially manipulate the generation of random numbers and other surprises. You can read more about it [here](https://docs.chain.link/docs/vrf/v2/security/#choose-a-safe-block-confirmation-time-which-will-vary-between-blockchains).

As we learned in the previous chapter, the VRF service will call your fulfillRandomWords() function once the request has been completed. If your function reverts, the VRF service will not try to call it another time. So you must be careful when assuming that you will always have updated random numbers. It is only true in case the call was not reverted. It could revert because a simple requirement was not fulfilled or a bug happened:

<Highlight class="language-javascript">
function fulfillRandomWords(
uint256, /_ requestId _/
uint256[] memory randomWords
) internal override {
s_randomWords = randomWords;
require(randomWords[0] % 50 > 10)
}
</Highlight>

If you requested a random number but are still waiting for an answer, do not call the function again until you get a response. Because VRF service could withhold a VRF fulfillment if the outcome is not desirable and hope that the second request is more favorable to them, you would potentially increase the chances of an attacker cheating your application. Imagine you implemented a simple coin flip smart contract using VRF v2. In a bet function, you choose heads or tails and then request a random number. If you have selected heads (0) and the result of the VRF service meant that you would win the bet, it could try to withhold this answer and replace it with your second request if it’s more advantageous.

So you see, we must consider the unique properties of blockchains here to ensure randomness in our smart contracts. While the numbers are always random, we must also look into how our applications and smart contracts deal with them. In the end, it will be a matter of cost if it's worth attacking your application. You must also be aware of the protocol that you are using.

In general, re-organizations on chains are possible. A miner would take your request and try to create a new random number with a different block and do this until they find a block to their advantage. They cannot control the VRF output but can "re-roll" the dice. If they manage to produce a valid blockchain with this new block and the network accepts this block instead, they could effectively attack your application by controlling the random input.
While this is a possible attack, it's costly to attack a network like this, as in the proof of network. You need at least 51% of the network to drive such an attack. Depending on your application requirements, you consider a 20-block confirmation time highly secure. You can lower the block confirmation time depending on the value you are trying to protect. You must calculate an attacker's costs and potential reward to decide your confirmation time.
