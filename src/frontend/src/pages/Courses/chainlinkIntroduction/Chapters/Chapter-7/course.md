Build your Interface
Difficulty: 1/5 | Estimated reading time: 4 min

story_image_7_0
People from all over the world can be connected through memes they like. Oh wait,... not quite! Before this all works, you have to provide them an easy interface to interact with the contracts, of course. Even in 2029 not everyone is a master with terminals. Ethan has started to create an application already.
The contracts have been deployed, you don’t really have to worry about them anymore. Now is the time to focus on the interface and connecting it with the contracts backend. The designs are not available yet but we can keep working on functionality.

git clone https://github.com/oceanByte/near-academy-museum-frontend
You see there is a src folder that contains the files to interact with NEAR and to display the results. It looks just like an ordinary web app. We are using the near-api-js library here which provides an easy way to interact with NEAR. Like with every other library, many details will become more clear when you really need them, so let’s focus on what’s needed now: We want to display a list of all available memes and interact with them by writing a comment.

As we know there is the museum contract with a function get_meme_list. We called it via the NEAR CLI before and we can do the same now with the near-api-js. You see that it does not matter how you connect to NEAR as long as it follows a specific protocol. The setup to get connected to NEAR is just a few lines.

story_image_7_1

import { connect, Contract, keyStores, WalletConnection } from 'near-api-js' import getConfig from './config'
const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables export async function initContract() { // Initialize connection to the NEAR testnet. // Note that the keys are saved in local storage and never leave the client! const near = await connect( Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig), )

// Initializing Wallet based Account. It can work with NEAR testnet wallet that // is hosted at https://wallet.testnet.near.org window.walletConnection = new WalletConnection(near)

// Getting the Account ID. If still unauthorized, it's just empty string window.accountId = window.walletConnection.getAccountId()

// Initializing our contract APIs by contract name and configuration window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, { // View methods are read only. They don't modify the state, but usually return some value. viewMethods: ['get_meme_list'], // Change (“call”) methods can modify the state. But you don't receive the returned value when called. changeMethods: ['create_meme'], }) } This initContract function initializes our contract APIs by using a contract name and configuration. You should recognize viewMethods and changeMethods (also known as callMethods). We can list all functions here that we want to use in our application.

That's all you need to know about configuration to get started. The rest works just like any other function calling an API.

Looking at index.js, we see that we can achieve our goal with four short functions.

1. Get the list of all Memes in the Museum We just use the name that was defined for the function in the contract to call it.

let memeLIst = [] async function getMemeList() { memeList = await window.contract.get_meme_list() // ... DOM manipulation here } Since we need to send our query through the network we need to await the answer. Just like an ordinary API call to a server. This will return an array with all the names for the accounts that contain the meme contracts.

2. Get all memes We are almost there. With the full memeList we can start to call the individual contracts and read the details. From the previous chapter we know that each contract is deployed on it’s own account. We need to call different contracts but all of the same kind (meme contracts). So we fill an array with new contracts to use them in the next step.

const memeContracts = []; async function setupMemeContracts() { memeList.forEach(meme => { memeContracts.push(await new Contract(window.walletConnection.account(), meme + “.” + nearConfig.contractName, { viewMethods: ['get_meme', ‘get_recent_comments’], changeMethods: [‘set_comment’]})) })
await Promise.all(memeContracts) console.log(memeContracts) // ... DOM manipulation here } 3. Display all memes Here we go. We have all the contracts ready and call the get_meme function for each of them to display the results.

const memes = [] async function showMemes() { memeContracts.forEach(async (memeContract) => { memes.push(memeContract.get_meme()) }) await Promise.all(memes) console.log(memes) // ... DOM manipulation here } **4. Write a comment**
Adding a comment to a Meme is just as easy as calling the function set_comment and providing your text.

async function setComment(memeIndex, text) { const result = await memes[memeIndex].set_comment(text) console.log(result) // ... DOM manipulation here } The message is saved in the meme contract on the NEAR testnet. In other words: calling this function alters the state of the blockchain and costs gas. The costs are a fraction of a cent but keep this in mind when writing more complex functions.
What to look for when writing a dApp
As we learned, each call of a change function costs gas. So it might not be desirable to ask the users to call the contracts directly. Instead, your server would call it for them. So effectively, you would pay for them. You see how you can give your users an advantage by using your platform: they get comments for free. But at the same time, you keep the ecosystem open as others could offer the same service or just let the users pay the fees.

The given example is written in plain javascript to keep it simple. But you could also use the latest frameworks like React, Vue and Angular.

How to enhance your contract(s) and what's next?
Have a look here to get started: https://github.com/near/create-near-app. Many extra features could be developed on top of the museum and meme contracts. The only limit is imagination. Consider for instance:

Use a voting system to remove memes from the museum
Design an improved system to curate the list of memes in the contract
Implement a royalty system for meme-makers based on likes and comments
Turn the museum into a fully decentralized autonomous organization (DAO)
Exercise
Use the getRecentComments function via the NEAR cli or use the web app and the near-api-js library to retrieve the latest comment made on the “bob33” meme contract. Copy/paste the very latest comment that was made for exercise validation.
