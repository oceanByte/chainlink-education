#####Chapter 10: Building a Basic Contract

## Requesting Randomness

Now that our contract is configured and the constructor is defined, lets set up the function that will send a request for random numbers. To send a request you need to call the “coordinator variable we set up earlier and call the requestRandomWords function from it:

<Highlight class="language-javascript">
s_requestId = COORDINATOR.requestRandomWords(
    keyHash,
    s_subscriptionId,
    requestConfirmations,
    callbackGasLimit,
    numWords
  );
</Highlight>
