#####Chapter 5:

# The Smart Contract Connectivity Problem

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     NFTs are a part of Web3.0 so why not take truly advantage of this new primitive and make your NFT change depending on some conditions on the outside world? We call these changing NFTs <i>Dynamic NFT</i> or <i>dNFTs</i>. But how will you connect your dynamic NFT to outside data?  
    </div>
  </div>
</ContentWrapp>

Blockchains and smart contracts are unaware of any conditions or logic that occur outside of the blockchain itself; they cannot connect to outside resources. This is due to the distributed and deterministic nature of blockchains. All of the distributed nodes (nodes are computers running the blockchain software) in the blockchain must come to a consensus on what the blockchain is and any changes to it. If the blockchain just connected to a data source, the nodes could query the data at different times and get other answers, breaking the ability for the nodes to reach consensus. Even worse, if that data source changed locations or is down, the whole blockchain would break.

This means developers can program smart contracts as long as their logic doesn’t require any outside data. This may sound highly limiting, but there is a system in place that sits in between blockchains and the outside world (a concept aptly called “middleware”). This middleware system is called an Oracle. The name <ColorWord>Oracle</ColorWord> comes from the Greek concept of an Oracle since it needs to determine what is <i>true</i> in outside systems.

<Spacer>

## Centralized Oracles

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     So an Oracle is the type of system you want to make a dNFT but it is important that the entire NFT remains decentralized so your art work can truly live on forever. You'll also want the NFT to be have the most accurate up-to-date data.
    </div>
  </div>
</ContentWrapp>

To create functional smart contracts we need a middleware system called an <ColorWord>Oracle</ColorWord>, but how will we make this Oracle? Well, we are trying to get price data into our smart contract for NFT’s. My friend Jim (trust me, he is good!) is an expert in cryptocurrency prices, and he even has a server set up that we can access for price data. Awesome, we'll make Jim our oracle and he will provide price data to our NFT smart contract.

But wait….didn’t all the great properties of smart contracts and blockchains come from their decentralized nature? What if Jim wanted to maliciously send our smart contract bad price data so he could manipulate it in his favor? What if his server goes offline when the NFT needs to update and thus can’t? What if Jim isn’t even malicious but gets hacked by a malicious actor? This single oracle solution isn’t solving much of the oracle problem because it isn’t <i>decentralized</i>, and thus provides a weak link that ruins all of those awesome smart contract properties. You  need to trust that Jim, and my word on Jim, that he is a great person and will act in the best interest of everyone. But what if we had a decentralized middleware solution, one where Jim doesn’t control everything (sorry Jim), so we didn’t have to trust him?

Finally we are here…...enter Chainlink!

<Spacer>

## Chainlink and Decentralized Oracles

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Using a Chainlink Decentralized Oracle Network (DON) as the Oracle for your dNFT can give you strong guarantees that your artwork will truly update with the latest, most acurate data and remain decentralized. 
    </div>
  </div>
</ContentWrapp>

Smart contracts have special properties and need decentralized oracles to carry out functions. This is where Chainlink comes in. <ColorWord>Chainlink is a platform for creating decentralized oracle networks that provide various smart contract services</ColorWord>. So using Chainlink, we can create a price oracle that isn’t just Jim but Jim and 30 other of the most trusted and expert crypto price data aggregators out there and make them come to an agreement.

Chainlink allows developers to create and customize any type of <ColorWord>Decentralized Oracle Network</ColorWord>, or DONs, a smart contract might need. Developers can choose which nodes are a part of a network, what type of data each node is looking for, how nodes come to an agreement, when nodes should post updates, and any other computation nodes should perform. Finally, with Chainlink, developers can build smart contracts that can interact with the outside world to preserve the decentralized nature of smart contracts.

<Spacer>

## How Chainlink Works

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
      Curious how Chainlink works? Read below! With Chainlink, any type of data the exists can be brought on chain, and the conditions on which that data is delivered can be customized! 
    </div>
  </div>
</ContentWrapp>

Chainlink allows developers to build and customize DONs. Chainlink allows DONs to work and assures that node operators are incentivized not to collude or act maliciously.

<p><ColorWord>How does Chainlink Work?</ColorWord></p>

<div>
  <p>Developers can customize several main areas of Chainlink DONs. These include:</p>
  <ul>
    <li>
      <p>Specifying what data DONs need to provide</p>
    </li>
    <li>
      <p>How DONs retrieve data </p>
    </li>
    <li>
      <p>When DONs provide data</p>
    </li>
    <li>
      <p>How agreement (also known as consensus) is achieved among the nodes to achieve a single source of truth for the specified data.</p>
    </li>
  </ul>
</div>

###Each step is outlined in more detail below:

<br><br>
<b>Specifying what data DONs need to provide</b>

Due to the proliferation of Decentralized Finance (DeFi), a popular use case of Chainlink DONs is relating them with price data. However, any type of data that is available in a digital format can be accessed. This includes but is not limited to weather data, YouTube views, sensor data, or even data from other blockchains. For the NFT we’re just going to stick to price data for now, specifically the ETH/USD price, but you can imagine all the possibilities of cool smart contracts we can make with all of the digital data available today!

<br>
<b>When DONS Provide Data</b>

Some applications require a DON that updates the data once a day. Others need updates once every five minutes or only when the data itself changes by a certain amount. The term <ColorWord>heartbeat</ColorWord> is used to desribe a DON that needs to post an update after a certain amount of time.hen the DON is updated after the data changes by a specified amount it is called a <ColorWord>deviation threshold</ColorWord>.

<br>
<b>How DONs Provide Data</b>

Ideally, nodes should retrieve data from multiple sources and <i>aggregate</i>, or combine, the data to return the most accurate price they can. Developers can use external adapters to customize the sources that nodes use to aggregate data. <ColorWord>External adapters</ColorWord> are custom built software packages that can be added to the nodes. These can be built in any programming language and perform any operations developers may find useful. These operations can be as simple as basic arithmetic but can span to being complex machine learning algorithms.

<br>
<b>How Consensus is Reached Among Nodes</b>

All of the different nodes in the DON have their own version of the price. Using this information, developers customize the aggregation method of Chainlink DONs to determine one value for the true price. This is another level of aggregation beyond the aggregation completed at the individual node level. Having multiple levels of aggregation ensures the highest level of data quality. This <i>aggregation method</i> can consist of any type of operation including median, mean, weighted mean, mode, or other calculations. In our dynamic NFT will make use of a data feed that takes the median of all the node’s price data, since the median is more resistant to outliers than the mean.
