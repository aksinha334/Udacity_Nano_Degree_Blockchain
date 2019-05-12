/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.bd.getBlocksCount().then((height) =>{
          console.log('height '+height.toString());
          if(height == -1){
            this.generateGenesisBlock();
          }
        })
      }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    async generateGenesisBlock(){
        // Add your code here
        await this.addBlock(new Block.Block('Abhishek Kumar Sinha'));
    }

    // Get block height, it is a helper method that return the height of the blockchain
    async getBlockHeight() {
        // Add your code here
        return await this.bd.getBlocksCount();
    }

    // Add new block
    async addBlock(block) {
        // Add your code here
        const height = await this.bd.getBlocksCount();
        console.log('height ' + height);
        block.height = height + 1;
        block.time = new Date().getTime().toString().slice(0,-3);
        if (block.height > 0) {
          console.log('Inside of block height '+block.height);
          var previous_block = JSON.parse(await this.bd.getLevelDBData(block.height-1));
          console.log(previous_block);
          block.previousBlockHash = previous_block.hash;
        }
        block.hash = SHA256(JSON.stringify(block)).toString();
        console.log(block.hash);
        await this.bd.addLevelDBData(block.height,JSON.stringify(block));
        console.log('Added block with height '+ block.height.toString());
    }

    // Get Block By Height
     async getBlock(height) {
        // Add your code
        return JSON.parse( await this.bd.getLevelDBData(height));
    }

    // Validate if Block is being tampered by Block Height
    async validateBlock(height) {
        // Add your code here
        let block = JSON.parse(await this.bd.getLevelDBData(height));
        let block_hash = block.hash;
        // Now removing the block_hash
        block.hash = ''
        //Get hash to validate blockchain
        let valid_hash = SHA256(JSON.stringify(block)).toString();
        if (block_hash == valid_hash) {
          return true
          }
       else{
          return false
          }
    }

    // Validate Blockchain
    async validateChain() {
        // Add your code here
        var error_log = []
        let height = parseInt(await this.bd.getBlocksCount());
        for(let i=0; i<height; i++){
          if (!this.validateBlock(i)){
            var msg = 'Block is not valid,Height '+ i.toString();
            console.log(msg);
            error_log.push(msg)
          }
          let block_hash = JSON.parse(await this.bd.getLevelDBData(i)).hash;
          let previous_hash = JSON.parse(await this.bd.getLevelDBData(i+1)).previousBlockHash;
          if (block_hash != previous_hash){
            var msg = 'Block previous_hash is not matching with current block hash,Height '+ i.toString();
            console.log(msg);
            error_log.push(msg);
          }
          if(height == -1){
            var msg = 'No block exist';
            console.log(msg);
            error_log.push(msg);
          }
        }
        return error_log
      }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    async _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }
}

module.exports.Blockchain = Blockchain;
