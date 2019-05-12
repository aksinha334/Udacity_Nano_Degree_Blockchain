Create Your Own Private Blockchain

PROJECT SPECIFICATION : Private Blockchain

1. Configure LevelDB to persist dataset

CRITERIA :

Configure your application to use levelDB to persist blockchain dataset.

MEETS SPECIFICATIONS :

Depending on the Starter Code selected, includes the Node.js level library and configured to persist data within the project directory.

2. Modify the App functions to persist data with LevelDB

a. CRITERIA :

addBlock(newBlock) function includes a method to store newBlock with LevelDB.

a. MEETS SPECIFICATIONS :

addBlock(newBlock) includes a method to store newBlock within LevelDB

b. CRITERIA :

Genesis block persists as the first block in the blockchain using LevelDB with height=0.

b. MEETS SPECIFICATIONS:

Genesis block persist as the first block in the blockchain using LevelDB. Additionally, when adding a new block to the chain, code checks if a Genesis block already exists. If not, one is created before adding the a block.

3. Modify "validation" functions

a. CRITERIA :

Modify the validateBlock() function to validate a block stored within levelDB.

a. MEETS SPECIFICATIONS:

validateBlock(height) function to validate a block stored within levelDB. This function should get the height as a   parameter and then retrieve the block and validate it. The validation should verify that the hash stored in the block is the same as the hash recalculated.

b. CRITERIA :

Modify the validateChain() function to validate blockchain stored within levelDB.

b. MEETS SPECIFICATIONS :

Implement the validateChain() function to validate blockchain stored within levelDB. You should retrieve the data and validate each block, also you need to validate that the hash of the block is equal to the next block previousBlockHash

4. Modify getBlock() function

CRITERIA :

Modify getBlock(height) function to retrieve a block by its block height within the LevelDB chain.

MEETS SPECIFICATIONS :

getBlock(height) function retrieves a block by block height within the LevelDB chain.

5. Modify getBlockHeight() function

CRITERIA :

Modify getBlockHeight() function to retrieve current block height within the LevelDB chain.

MEETS SPECIFICATIONS:

getBlockHeight() function retrieves current block height within the LevelDB chain.


Submission
To successfully complete this project and meet the rubric criteria.

You may submit your project as a archive file in zip format, or, with your github repository.
