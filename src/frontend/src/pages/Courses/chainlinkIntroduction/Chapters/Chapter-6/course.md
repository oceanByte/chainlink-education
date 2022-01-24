#####Chapter 6:

# Chainlink Data Feeds

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Now that you understood how to connect the off-chain world you can utilize this knowledge now for your NFT. Imagine a NFT that reacts to the price of Ethereum. It could rain when the price falls and it could be sunny when the price rises.
    </div>
  </div>
</ContentWrapp>

As discussed in the previous lesson, Chainlink gives developers the ability to create extremely powerful DON’s that provide smart contracts with the highest quality data from outside the blockchain. As a smart contract developer, how can you take advantage of these DONs in your own smart contracts? Chainlink is open source so there’s always the option of making your own DON, but creating a DON is a complex and nuanced process. Instead, in the spirit of old developer adage “Never build something twice”, lets make use of existing DONs if possible.

Luckily, many of the largest and highest quality node operators in the blockchain industry have already combined their knowledge and prowess to create DONs that serve the most in-demand data for smart contract developers to take advantage of. These data serving DONs are called <ColorWord>Chainlink Data Feeds</ColorWord>. Currently most of the data feeds provide data on various currency and cryptocurrency pairs, as that was initially what smart contract developers needed, but data feeds can be used to retrieve any type of data.

You can see these data feeds updating in real time at data.chain.link. There you can select different blockchains Chainlink DONs are posting data to, as well view the details of each DON that compose a particular data feed. For instance if you click on the ETH/USD data feed you will see all the nodes involved in the DON, what price each individual node posted, and the final aggregated price of the asset. Some important terms you may notice are:

<p><ColorWord>Rounds</ColorWord>DONs update data feeds in rounds. When a new round is initiated the nodes in a DON retrieve the latest data point from data providers, aggregate the data at the individual node level and finally aggregate the between the nodes. Once the final aggregated data point, along with each individual nodes observation, is posted on-chain the round is considered complete.</p>
<p><ColorWord>Heartbeat</ColorWord>The maximum amount of time that is allowed to pass before the DON automically starts a new round and updates the data.</p>
<p><ColorWord>Deviation Threshold</ColorWord>If a node within the DON senses the data fluctuates by a certain percentage, they will automatically start a new round forcing the DON to update the data feed regardless of how much time has elapsed.</p>

<MissionContainer>
  <div className="title">Quizzes:</div>
  <ol className="mission-goals">
    <li>
      What is the heartbeat for the ETH/USD data feed on Ethereum mainnet?
    </li>
    <li>
      What is the deviation threshold for the BTC/USD data feed on Binance Smart Chain mainnet?
    </li>
  </ol>
</MissionContainer>

## Programming with Chainlink Data Feeds

Now that we understand how Chainlink data feeds work, lets use them within a smart contract. To use a chainlink data feed within a smart contract you only have to complete three simple steps:

<div>
  <ul>
    <li>
      <p>Import the AggregatorV3Interface into your smart contract</p>
    </li>
    <li>
      <p>Point the interface to the desired data feed</p>
    </li>
    <li>
      <p>Access the latest data!</p>
    </li>
  </ul>
</div>
