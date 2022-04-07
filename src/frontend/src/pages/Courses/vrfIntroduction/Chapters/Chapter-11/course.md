#####Chapter 11: Building a Basic Contract

# Recieving Randomness

Now that we have a function that can send a request to the Chainlink VRF for randomness, we need a function that will take in the random number from the VRF. This function has to be called fulfillRandomWords. The parameters we will have in the is function is an array of type uint256[] called randomWords.

In this function, you can run whatever logic you would like with the randomNumber. For this lesson, we will just be storing them in the variable s_randomWords set up in our contract.

<Highlight class="language-javascript">
function fulfillRandomWords(
    uint256, // requestId
    uint256[] memory randomWords
  ) internal override {
    s_randomWords = randomWords;
  }
</Highlight>
