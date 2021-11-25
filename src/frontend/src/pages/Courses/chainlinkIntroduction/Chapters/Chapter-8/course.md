#####Chapter 8:

Conclusion
=============================

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Connect your artwork to the price of gold or ETH or overall Market Cap. Mention the concept of “Hybrid Smart Contracts”. 
    </div>
  </div>
</ContentWrapp>

As discussed in the previous lesson, Chainlink gives developers the ability to create extremely powerful DON’s that provide smart contracts with the highest quality data from outside the blockchain. As a smart contract developer, how can you take advantage of these DONs in your own smart contracts? Chainlink is open source so there’s always the option of making your own DON, but creating a DON is a complex and nuanced process. Instead, in the spirit of old developer adage “Never build something twice”, lets make use of existing DONs if possible.

Luckily, many of the largest and highest quality node operators in the blockchain industry have already combined their knowledge and prowress to create DONs that serve the most in-demand data for smart contract developers to take advantage of. These data serving DONs are called <ColorWord>Chainlink Data Feeds</ColorWord>. Currently most of the data feeds provide data on various currency and cryptocurrency pairs, as that was initially what smart contract developers needed, but data feeds can be used to retrieve any type of data. 

You can see these data feeds updating in real time at data.chain.link. There you can select different blockchains Chainlink DONs are posting data to, as well view the details of each DON that compose a particular data feed. For instance if you click on the ETH/USD data feed you will see all the nodes involved in the DON, what price each individual node posted, and the final aggregated price of the asset. Some important terms you may notice are:

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

Now that we  understand how Chainlink data feeds work, lets use them within a smart contract. To use a chainlink data feed within a smart contract you only have to complete three simple steps:
