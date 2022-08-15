#####Chapter 7:

# Events

When learning a new language, we often write a hello world program and log a string to the console. Solidity does not offer a console.log but has events that can be used in a similar fashion. You can use it to emit events that clients can listen to react accordingly. They can also be used as a cheap form of storage as it is less expensive to emit an event than to use the storage location (see chapter 2). But note that events are write-only. EVM does not allow to read events.

Let’s learn how we can use events in Solidity:

<Highlight class="language-javascript">
contract Event {
 event Log(address indexed sender, string message);
 
 function foo() public {
       emit Log(msg.sender, "Hello World!");
       emit Log(msg.sender, "Another message");
 }
}
</Highlight>

On the top we have defined a name of the Event and defined it’s parameters. You can see here that we have indexed and not index parameters. Indexed parameters are called “topics” and are searchable parameters in events. We will explain why this is useful in a moment.

We can now use the keyword **emit** followed by the event name **Log** to emit an event of the type Log. These events can be read on an explorer like Etherscan. And there you will see that each event has the address of the contract or account the event is emitted from and Topics which is the indexed parameter of the event and the data itself. These are ABI-Encoded or hashed non-indexed parameters of the event. More on ABI in a future course.
Libraries like ethers.js allow us to listen to these events and react accordingly. The great thing about events is that applications not interested in writing or interacting with the blockchain can still react to events emitted from smart contracts. In other terms, you could consider events a simple way to communicate easy-to-access messages to listeners. You can either listen to them in real-time as they are written to a new block or also retrieve historical events from the past. It makes it easy to create an audit trail this way. You will often see events used to communicate that a new token was minted.
