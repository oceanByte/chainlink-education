#####Chapter 2:

# EVM Intro

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
     Having a basic understanding of what’s going on under the hood in Solidity is important so let’s learn about the EVM!
    </div>
  </div>
</ContentWrapp>

Not so quick! I know you are ready to learn Solidity, but there is one other important subject you should know before moving on: the Ethereum Virtual Machine or EVM. The EVM is what reads your code when it is deployed to a blockchain. When Solidity code is compiled, it is turned into EVM bytecode. EVM bytecode is commands that the EVM can read and act on. When a smart contract is deployed to Ethereum, its bytecode lives there forever; always accessible. Any language other than Solidity that can compile to EVM bytecode can also be used to write smart contracts on blockchains that utilize the EVM. Another language that compiles to EVM bytecode is Vyper. Examples of blockchains that run the EVM are Ethereum, Polygon, and Avalanche (among many others). Many blockchains now use the EVM making Solidity an even more powerful smart contract language! 

Some blockchains have virtual machines other than the EVM and thus have different programming languages and bytecode compilation targets, but for this course, we’ll stick with Solidity and the EVM.

<!-- <MissionContainer>
  <div className="title">Arbitration Court</div>
    <div className="description">
    In fact legal contracts have become so notorousily difficult to enforce, more companies have been putting "arbitration" clauses in their contracts. This means a private arbitration court is used to uphold the contract rather than a public judicial court. There has been a lot of controversy surrounding arbitration courts. You can read more about the history of arbitration courts in <a style="color:green" href="https://www.americanbar.org/groups/tort_trial_insurance_practice/publications/the_brief/2018-19/summer/a-brief-history-arbitration/"> this article by the american bar association </a>.
    </div>
</MissionContainer> -->
