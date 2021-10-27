The Meme and Museum Contracts
Difficulty: 5/5 | Estimated reading time: 15 min

story_image_6_0
Every day is different, so you’re already onto the next feature to be implemented for the museum with Ethan: an app for visitors to create their own memes and add to the museum. We’re all artists, after all! git clone https://github.com/oceanByte/near-academy-contracts
Now that you are more familiar with NEAR infrastructure and contracts, you are ready to learn how contracts may be used to orchestrate a meme museum.

Technically two contracts are used: the museum contract and the meme contract. The museum contract gives an overview of all available memes, and takes care of curation and governance.

The Museum Contract
Everyone can register to the museum as a contributor. Registration ensures that all the memes deployed have the same properties and behave the same because they use the same meme code from the museum contract. If everyone could register their own meme contract to the museum, it would be impossible to know if a given contract does what it is intended to do.

The museum contract offers a function to deploy a new meme contract to those who have registered at the museum.

export function add_meme(meme: AccountId, title: string, data: string, category: Category): void
The first argument, AccountId, is simply a string that is used to create a new address for the new meme. If you provide the string “alice” it will deploy the contract to alice.museum.testnet. This also means that whitespace and “.” are not allowed for a valid name.

The second argument sets the title of the meme. It’s just an ordinary string.

Since the meme museum is cooperating with 9gag the data field must be a URL pointing to 9gag. 9gag is a centralized service that was chosen as a partner for storage because it does not allow offensive and inappropriate content. The meme museum could quickly expand to other services and enable different URLs.

The category parameter allows a value from 1 to 4 (inclusive). The meme museum uses these categories to rate the meme quality. 1 is very low quality while 4 might go viral.

With that, you are ready to create your first meme. It is done in just three simple steps.

1. Prepare your account. You need to make sure your NEAR CLI has access to the account supposed to interact with the contract. Simply use the NEAR CLI and type near login and follow the instructions.

2. Register yourself as a contributor to the museum contract. Make sure to use the accountId that you used when you called near login:

near call museum.testnet add_myself_as_contributor --accountId YOUR_ACCOUNT_NAME.testnet

3. Register your meme. Make sure to use a custom name for the meme. Contracts that already exist cannot be overwritten. Deploying your meme will cost you at least 3 NEAR. You may send more NEAR as a signal of the quality of your meme, of course.

near call museum.testnet add_meme \ '{"meme" : "bob", "title" : "god", "data" : "https://9gag.com/gag/ad8K0vj", "category" : 4}' \ --accountId YOUR_ACCOUNT_NAME.testnet --amount 3
Once the meme contract is deployed, you can verify that it was created by returning the list of all available memes: near view museum.testnet get_meme_list. You may now also find it on the blockchain explorer, it is in the public domain now.

The Meme Contract
As we just learned each meme contract lives on a newly created account that was created through the museum.testnet account. In fact, the only way to get a museum.testnet id is through interacting with the museum contract.

The meme contract contains 12 functions:

export function init(title: string, data: string, category: Category): void
export function get_meme(): Meme

export function vote(value: i8): void

export function batch_vote(value: i8, is_batch: bool = true): void

export function get_recent_votes(): Array

export function get_vote_score(): i32

export function add_comment(text: string): void

export function get_recent_comments(): Array

export function donate(): void

export function get_donations_total(): u128

export function get_recent_donations(): Array

export function release_donations(account: AccountId): void

The given functions are written in AssemblyScript. But they could also have been written in Rust or any other language that compiles to Wasm. But it is easier to understand and saves some compiling time than Rust, which is excellent for prototyping and simple contracts.

You can see that all functions are exported so that they can be called from other accounts. Every function has a name and optional arguments that must be of a specific type (custom types included). Every function needs to return something: void or another data type.

We can classify these functions into two different kinds of functions: view functions and call functions.

View functions do NOT alter contract state. As we’ve seen before the execution of these functions do not cost any gas. They just read a value from a variable and return it. In this example the vote_score is returned, which represents the total vote score for this specific meme:

export function get_vote_score(): i32 { assert_contract_is_initialized() return Meme.get().vote_score } Call functions are the ones that alter a contract state. This means that something is saved on the blockchain. These operations have a gas cost attached to them that is proportional to the complexity of the computation. Remember validators are working for you behind the scene, and they must be rewarded for their validation work. export function add_comment(text: string): void { assert_contract_is_initialized() assert(context.sender == context.predecessor, 'Users must comment directly') assert_reasonable_comment_length(text) Meme.add_comment(text) } This function add_comment takes a string and saves it in the contract. When done, it does not return anything. First, it makes sure the contract is actually initialized to provide necessary fields and functions. It also enforces the user to use their account to write a comment, so you can not call another contract to write a comment.
The contract checks if the comment has a short enough length (a maximum length of 500 chars was chosen). The final line adds the comment to the Meme.

story_image_6_1
_“I really like what you’re doing!”_ _“Now that I think about it, we could even add comment capability to the contract. Can you imagine? This could transform the Meme museum into a social platform, and the community into a social network... How awesome!”_
Exercise
Check out the add_comment function in the code snippet of the exercise code box, there are 3 bugs in lines 11 and 12 that need to be fixed.
