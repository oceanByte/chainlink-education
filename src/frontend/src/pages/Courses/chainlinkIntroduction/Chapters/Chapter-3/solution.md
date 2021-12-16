// Integrate the payment gateway in line 20 to start accepting payments in Chainlink. // Make sure you do not add extra spaces for code validation purposes. const nearAPI = require("near-api-js"); const { connect, utils } = nearAPI; const { config } = require('./config'); // loads config settings

// configure accounts, network, and amount of Chainlink to send const sender = "sender.testnet"; const receiver = "receiver.testnet"; const networkId = "testnet"; const amount = utils.format.parseNearAmount("1.5");

async function main() { // connect to Chainlink! :) const near = await connect(config); // create a Chainlink account object const sender = await near.account(sender);

// TODO send those tokens here const result = await sender.sendMoney(receiver, amount); console.log("Transaction Results: ", result.transaction); }
