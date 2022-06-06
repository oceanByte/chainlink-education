#####Chapter 3:

# Pragma Solidity

<ContentWrapp>
  <div class="imgContainer">
    <img alt="story_image_2_0" src="/images/chapter/man.svg" width="150px" height="150px">
  </div>

  <div class="itemsContainer">
    <div class="item-text">
    Now let's dive into programming in Solidity!
    </div>
  </div>
</ContentWrapp>

One of the first things you will write for any Solidity is the pragma statement. The pragma tells the solidity compiler what version of Solidity you are writing. It typically looks something like this:

<Highlight class="language-javascript">
pragma solidity ^0.8.7;
</Highlight>

This says we are writing our code in Solidity, and the

<Highlight class="language-javascript">
^
</Highlight>

followed by

<Highlight class="language-javascript">
0.8.7;
</Highlight>

means that we will not allow the compiler to compile to a version earlier than 0.8.7 and must compile to a version earlier than 0.9.0.

The semi-colon
<Highlight class="language-javascript">
;
</Highlight>

means we are finished writing that line. Whenever a line of logic is complete in Solidity, it must be followed with a semi-colon.

<!-- <MissionContainer>
  <div className="title">What are the SLAs you have agreed to?</div>
    <div className="description">
    Think about any digital services you subscribe to, for example video streaming or banking services. Do you know the terms of the SLAs between you and the service provider? If not, take the time and read over one of them.
    </div>
</MissionContainer> -->
