#####Chapter 1:

# EVM: State Machine and Turing Completeness

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
    Ethereum is often described as a distributed state machine that is quasi Turing complete. Sounds complicated, right? Let's break it down and understand what it means.
    </div>
  </div>
</ContentWrapp>

A state machine is a system with a finite number of states and a finite number of transitions between those states. A state is a condition that the system is in. Let's assume you have two boolean variables, x and y. Let’s also assume these variables are set to x is **true** and y is **false**. This is our current state.
A transition is a way to move from one state to another. We can think of a transition as a set of rules that must be followed to perform a change. In our example, x and y can only be set to **true** or **false**. So we have 2^2 = 4 possible states. We can move from one state to another based on the input triggering the transition. And everyone with the same input and state would come to the same conclusion and new state. This is called a finite state machine.

Now let's apply this to Ethereum. Let's imagine Alice has 4 ETH and Bob has 1 ETH. We can imagine their account balance as variables stored in the Ethereum blockchain. This is our current state. Now Alice wants to send Bob 1 ETH. This is our desired new state. To perform this transition, one must follow explicit rules to perform the change. Transaction verification is beyond the scope of this chapter. But the main point is to understand that the verification is performed to enable the transition to the new state. If the verification was successful, Alice has 3 ETH and Bob has 2 ETH. This is our new state. And everyone can repeat this transition by looking at the previous state and applying the pre-defined transition rules.

Ethereum provides the Ethereum Virtual Machine (EVM) to allow custom implementation of transition rules (see Solidity101, [chapter 1](https://www.chainlink.education/solidityIntroduction/chapter-1)). So we can use Smart Contracts to model the state of the system. But there is an important limitation here. EVM is just quasi Turing Complete. Let’s understand what this means.

A Turing Complete system can solve any computational problem. A problem can be as simple as adding two numbers together. Or it can be as complex as calculating an optimal route between two points on a map. Ethereum could be considered Turing Complete because it can execute any program a Turing machine can run. But Ethereum has some unique properties that make it just quasi Turing Complete. Because blocks have a finite memory space, executing a program that is too large to fit in memory is impossible. This is the first limitation.
The second limitation is that Ethereum is a decentralized world computer that must always be online. So it must be ensured that a program is not running forever. As there is no algorithm to determine if a program would halt and not run into an infinite loop (known as the halting problem), Ethereum uses gas to limit the number of computations that can be performed. So every instruction is executed with a cost. It provides a practical solution to the halting problem. Otherwise, bad actors could spam the network and cause a denial of service.
