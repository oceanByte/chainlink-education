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

`pragma solidity ^0.8.7;`

This says we are writing our code in Solidity, and the`^`   followed by `0.8.7;` means that we will not allow the compiler to compile to a version earlier than 0.8.7 and must compile to a version earlier than 0.9.0.

The semi-colon `;`means we are finished writing that line. Whenever a line of logic is complete in Solidity, it must be followed with a semi-colon.

<!-- <MissionContainer>
  <div className="title">What are the SLAs you have agreed to?</div>
    <div style="color:white">
    Think about any digital services you subscribe to, for example video streaming or banking services. Do you know the terms of the SLAs between you and the service provider? If not, take the time and read over one of them.
    </div>
</MissionContainer> -->
