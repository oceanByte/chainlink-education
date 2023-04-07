// Implement the missing function to display the recent comments

async function setupMemeContracts() { memeList.forEach(meme => { memeContracts.push(await new Contract( window.walletConnection.account(), meme + “.” + nearConfig.contractName, { viewMethods: ['get_meme', ‘get_recent_comments’], changeMethods: [‘set_comment’]})) })

await Promise.all(memeContracts) }

const memeContracts = []; setupMemeContracts();

async function getRecentComments(index) { // TODO implement me const recentComments = await memeContracts[index].get_recent_comments(); return recentComments; }
