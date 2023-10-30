#####Chapter 3:

# Trigger Example for Chainlink Automation

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
    Greetings once again! As we step into Module 3, we are about to delve into the core trigger mechanisms integral to Chainlink Automation. This phase is crucial as it expands upon the foundation laid in the previous module, guiding you towards understanding how to automate functions within the Chainlink ecosystem. Let’s traverse through these >trigger examples.
    </div>
  </div>
</ContentWrapp>


Transitioning to the operational specifics, upkeeps and triggers form the crux of on-chain tasks or jobs. For instance, invoking a smart contract function when a certain set of conditions are met epitomizes a trigger. Currently, Chainlink Automation Network supports <a style=" color:blue" href="https://docs.chain.link/chainlink-automation/overview/getting-started">three trigger types</a>:

Time-based Trigger:
Employ a time-based trigger to schedule your function execution. This feature, also known as the Job Scheduler, is reminiscent of the Ethereum Alarm Clock. Time-based trigger contracts do not necessitate compatibility with the AutomationCompatibleInterface contract.

Custom Logic Trigger:
Utilize a custom logic trigger to furnish custom solidity logic which Automation Nodes evaluate (off-chain) to ascertain when to execute your function on-chain. Your contract must align with the requirements to be compatible with the AutomationCompatibleInterface contract.

Log Trigger:
Harness log data as both trigger and input, with the prerequisite that your contract is compatible with the AutomationCompatibleInterface contract.

Automation Nodes:
Within the Chainlink Automation Network, Automation Nodes render services to upkeeps that are funded and registered in the Automation registry. These nodes, operated by the same Node Operators as Chainlink Data Feeds, epitomize the operational finesse that underpins Chainlink Automation, fortifying its stance as a pivotal force in blockchain-based operational automation.
Now let’s see how we can use these triggers to automate.

Time-based Trigger: Increment a counter every 5 minutes using our sample contract.
Procedure: Head to the <a style=" color:blue" href="https://automation.chain.link/">Chainlink Automation app</a> and connect to Arbitrum Goerli via the top dropdown menu. Register a new upkeep, selecting Time-based trigger. Enter the target contract address and specify the contract call details. Define your time schedule, for instance, every 5 minutes, and finalize your upkeep registration. Congratulations on automating your first time-based upkeep!

https://automation.chain.link/

Custom Logic Trigger: Increment a counter using custom on-chain logic.
Procedure: Within the Chainlink Automation app, register a new upkeep but this time select Custom Logic Trigger. Enter the required contract address and upkeep details. This contract uses on-chain logic to decide when to increment a counter. Complete your upkeep registration and witness your first custom logic upkeep in action!

Log Trigger: Increment an on-chain counter utilizing a log as the trigger.
Procedure: Register a new upkeep, selecting Log Logic Trigger. Input the respective contract addresses and specify the emitted log details to trigger your upkeep. After registration, use the bump function to emit the log and trigger your upkeep, observing the results in the Automation dashboard. Kudos on automating your first log trigger upkeep!





---
Digital agreements have been the most common format of agreements in the past decade. From bank agreements to social media to Netflix and crypto exchanges, companies who provide services on the Internet typically use digital agreements to detail the exact conditions of the service to be provided. These are called SLAs or Service Level Agreements.

What makes a digital agreement different from a regular agreement or contractual agreement? Well, they're like standard agreements…but in a digital format. These agreements can be enforced in a court of law under certain circumstances. However, this doesn't often happen due to the costs of going to court coupled with the low value these contracts represent for individual consumers.

Customers also tend to refrain from reading these agreements due to lengthy, complex legalese. Often digital agreements give consumers very little recourse at all! Due to these reasons, the power of digital agreements is heavily skewed towards the institutions who create them rather than being a fair, equitable agreement between institutions and their consumers. A prime example of this is the <a style=" color:blue" href=" https://www.jama.work/blog/on-robinhood-and-availability"> Robinhood Gamestop downtime incident</a>.

<MissionContainer>
  <div className="title">What are the SLAs you have agreed to?</div>
    <div className="description">
    Think about any digital services you subscribe to, for example, video streaming or banking services. Do you know the terms of the SLAs between you and the service provider? If not, take the time and read over one of them.
    </div>
</MissionContainer>
