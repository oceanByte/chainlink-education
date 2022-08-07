#####Chapter 1:

# EVM and Turing Completeness

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

A state machine is a system that has a finite number of states and a finite number of transitions between those states. A state is a condition that the system is in. You can imagine a condition as a complete set of all variables in a program. Let's assume you have two boolean variables, x and y. And these varialbes are set to x is **true** and y is **false**. This is our current state.
A transition is a way to move from one state to another. We can think of a transition as a set of rules that must be followed to perform a change. So in our example, x and y can only be set to **true** or **false**. So we have 2^2 = 4 possible states. Based on the input, we can move from one state to another. And everyone with the same input and the same state would come to the same conclusion and new state. This is called a finite state machine.

Now let's apply this to Ethereum. Let's imagine Alice has 4 ETH and Bob has 1 ETH. We can imagine their account balance as variables stored in the Ethereum Blockchain. This is our current state. Now Alice wants to send Bob 1 ETH. This is our desired transition. This transition follows explicit rules that must be followed to perform the change. Transaction verification is beyond the scope of this chapter, but it is only essential to understand that the verification is performed to enable the transition to the new state. If the verification was successful, Alice has 3 ETH and Bob has 2 ETH. This is our new state. And everyone can repeat this transition by looking at the previous state and applying the defined transition rules.

<img alt="Ethereum State Transition" src="~/images/courses/solidity_transition-ethereum.png" width="350px">

Smart Contracts can be used to model the state of the system. This is called a state machine. The Ethereum Virtual Machine knows the rules how to change the state and this is the way we model the state of the Ethereum Blockchain.

Now let's understand what quasi Turing Complete means here. A Turing Complete system is one which can solve any computational problem. A problem can be as simple as adding two numbers together. Or it can be as complex as calculating an optimal route between two points on a map. Ethereum is considered Turing Complete because it can execute any program that a Turing machine can run. But Ethereum has some special properties that make it just quasi Turing Complete. Because blocks have a finite space of memory, it is not possible to execute a program that is too large to fit in memory. And since execution must halt to ensure that Ethereum can stay online as it is after a global computer. As there is no algorithm to determine if a program would halt and not run into an infite loop, Ethereum uses gas to limit the number of computations that can be performed. So every instruction is executed with a cost. It provides a practical solution to the halting problem that would allow bad actors to spam the network and cause a denial of service.

So we learned that Etheruem can be viewed as a state machine. And that the EVM can is used to model the state of the system. To allow any kind of program, gas costs are introduced, to keep the system secure and prevent spam attacks.
