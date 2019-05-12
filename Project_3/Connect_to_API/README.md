# Project 3. Connect Private Blockchain to Front-End Client via APIs


This is Project 3, Connect Private Blockchain to Front-End Client via APIs, in this project I created the classes to manage my private blockchain, to be able to persist my blochchain I used LevelDB. then I created the two endpoint one get the block by block height and another post to submit the block to BlockChain.

# Framework used in this Project

I've used Express.js Framework in this project.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node index.js__ in the root directory.
4. Use PostMan to perform GET and POST operations.

## Testing the project

The file __index.js__ in the root directory needs to be execute for testing the project.

1. GET  endpoint
Open PostMan, type localhost:8000/block/blockheight # blockheight should be positive integer, It's the height of your chain
You'll get the data in JSON format

2. POST  endpoint
Open PostMan, type localhost:8000/block/ # choose content type application/json and send the payload in this format
{
	"data": "Your message";
}
You'll get the response, if Block is added as "Added the Block".
You'll get the response, If no payload is available as "No payload available"
You'll get the response, If any error occurred.


## What do I learned with this Project

* I was able to identify the basic data model for a Blockchain application.
* I was able to use LevelDB to persist the Blockchain data.
* I was able to write algorithms for basic operations in the Blockchain.
* I was able to write the endpoint in Express.js
