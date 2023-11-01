#####Chapter 4:

# Automating Functions with Chainlink

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Now that the groundwork has been laid, it's time to immerse ourselves in creating and managing automated tasks with Chainlink. This module will translate your setup endeavors into actionable skills within the dynamic realm of automation. Are you ready to animate your smart contracts? Let's leap into action!
    </div>
  </div>
</ContentWrapp>

Having interacted with Chainlink Automation and garnered a deeper comprehension of Chainlink automation, we now transition into the practical realm of creating and managing automated tasks. This module delineates the steps to formulate a time-based automated task using Chainlink Automation. By the end of this module, mastering the use of time-based triggers to automate smart contract functions - a quintessential skill in decentralized automation, will be within your grasp.

Creating an Automated Task

Understanding the Significance of Automation:
Chainlink Automation facilitates the scheduling of smart contract function calls based on time. This feature is indispensable for recurring function triggers such as daily weather data retrieval or asset price fetching on every block.

Deploying an Automated Functions Consumer Contract:

Commence by deploying a Functions consumer contract on the Polygon Mumbai network. Access the <a style=" color:blue" href="https://remix.ethereum.org/#url=https://docs.chain.link/samples/ChainlinkFunctions/AutomatedFunctionsConsumerExample.sol">AutomatedFunctionsConsumerExample.sol</a> contract in Remix, compile the contract, and follow through with the steps to deploy it on the Polygon Mumbai network.

Creating a Chainlink Functions Subscription:
Post deployment, create a Chainlink Functions subscription and include your contract as an approved consumer contract. This subscription is pivotal for the management of your automated tasks.

Configuring Chainlink Automation

Registering Your Deployed Contract:

Proceed by registering your deployed contract using the <a style=" color:blue" href="https://automation.chain.link/"Chainlink Automation App</a>. This registration actuates time-based automation for your contract.

Configuring Upkeep Parameters:
Tweak the upkeep settings like trigger type, target contract address, ABI, target function, time interval, gas limit, and starting balance in LINK. These configurations are critical for the seamless operation of your automated tasks.

Monitoring Your Balances:
It's imperative to keep tabs on your subscription balance and upkeep balance to ensure the uninterrupted operation of your automated tasks. Your subscription balance gets debited each time your Chainlink Functions is fulfilled, and your upkeep balance compensates the Chainlink Automation Network for dispatching your requests as per your specified time interval.

Securing Your Automation Consumer Contract:

Setting Permissions:
Amend your contract settings to permit only the upkeep contract to invoke the sendRequestCBOR function. This security measure thwarts unauthorized entities from triggering your functions, potentially depleting your Functions subscription balance.

Configuring Request Details:
Modify the request details by executing the updateRequest function. This maneuver stores vital data like the encoded request, gas limit, subscription ID, and job ID in the contract storage, ensuring your automated tasks possess all requisite information for accurate execution.
