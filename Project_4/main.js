const bitcoin_message = require('bitcoinjs-message')
const bitcoin_lib = require('bitcoinjs-lib')
const express = require('express');
const hex2ascii = require('hex2ascii')
const bodyparser = require('body-parser')
const Block = require('./Block.js');
const Blockchain = require('./BlockChain.js');
const app = express()
const TimeoutRequestsWindowTime = 5*60*1000;

let mempool = {};
let timeoutRequests = {};
let mempoolValid = {};


app.get('/block/:index',(req, res) => {
  let height = req.params.index;
  let blockchain = new Blockchain.Blockchain();
  blockchain.getBlock(height).then((block) => {
    res.send(responseOfAddedBlock(block));
  }).catch((err) => {console.log(err);
                      res.send(err);});
});

app.get('/stars/hash/:HASH',(req, res) => {
  let hash = req.params.HASH;
  let blockchain = new Blockchain.Blockchain();
  blockchain.getBlock_Byhash(hash).then((block) => {
    res.send(responseOfAddedBlock(block));
  }).catch((err) => {console.log(err);
                      res.send(err);});
});

app.get('/stars/address/:ADDRESS',(req, res) => {
  let address = req.params.ADDRESS;
  let blockchain = new Blockchain.Blockchain();
  let block_array = []
  blockchain.getBlock_ByAddress(address).then((blocks) => {
    blocks.forEach(function(value){
      block_array.push(responseOfAddedBlock(JSON.parse(value)));
    });
    res.send(block_array);
  }).catch((err) => {console.log(err);
                      res.send(err);});
});

app.use(bodyparser.json());
app.post('/block/',(req, res) => {
  let body = req.body;
  console.log(body);
  let address = body.address;
  if (! verifyAddressRequest(address)){
    res.send('Address is not verified')
    return
  }
  let data = {
    address : address,
    star : {
      ra : body.star.ra,
      dec : body.star.dec,
      story : Buffer.from(body.star.story).toString('hex')
    }
  }
  let block = new Block.Block(data);
  let blockchain = new Blockchain.Blockchain();
  blockchain.addBlock(block).then((value) => {
    console.log('Added the block');
    res.send(responseOfAddedBlock(value));
  }).catch((err) => {console.log(err);
                     res.send('Error Found');});
});

app.post('/requestValidation',(req, res) => {
  let req_body = req.body;
  let address = req_body.address.toString();
  if(! address){
    res.send('No payload available or not in correct format');
  }
  let result = addRequestValidation(address);
  if(result){
    res.send(result);
    console.log(result);
  }
  else{
    let msg = 'Found error in request validation for wallet address' + address;
    res.send(msg);
    console.log(msg);
  }
});

app.post('/validate',(req, res) => {
  let req_body = req.body;
  let address = req_body.address.toString();
  let signature = req_body.signature.toString();
  if (! address || !signature){
    res.send('No payload available or not in correct format');
  }
  let result = validateRequestByWallet(address, signature);
  if(result){
    res.send(result);
  }
  else{
    let msg = 'Found error in validating the wallet addess '+ address +' and signature'
    res.send(msg);
    console.log(msg);
  }
});

app.listen(8000);

//###########################################################################


function delete_address(address){
  delete mempool[address];
  delete timeoutRequests[address];
  delete mempoolValid[address];
  console.log('Deleted the data related to '+address);
  }

function addTimeOut(address){
  timeoutRequests[address] = setTimeout(() => {
    delete_address(address);
  }, TimeoutRequestsWindowTime);
  }

function addRequestValidation(address){
  let timestamp = new Date().getTime().toString().slice(0,-3);
  let msg = address+":"+timestamp.toString()+":starRegistry";
  let validationWindow = TimeoutRequestsWindowTime/1000;
  if (address in mempool){
    let data = mempool[address];
    let requestTimeStamp = data.requestTimeStamp;
    let currentTimeStamp = new Date().getTime().toString().slice(0,-3);
    let timeLeft = parseInt((currentTimeStamp - requestTimeStamp) / 1000);
    mempool[address].requestTimeStamp = timeLeft;
    console.log('Address '+ address +' already submitted');
    return mempool[address];
  }
  else{
    let data = {
      walletAddress :  address,
      requestTimeStamp : timestamp,
      validationWindow : validationWindow,
      message : msg,
      }
    mempool[address] = data;
    addTimeOut(address, validationWindow);
    console.log('Added '+ address+ ' to the memorypool, default window time = 5 min');
    return data;
    }
  }

function validateRequestByWallet(address, signature){
  let signature_String = signature.toString();
  if(!(address in mempool)){
    let msg = 'Wallet address is not found in the MemoryPool to validate'
    return msg
    }
  let message = mempool[address].message;
  let isAddressAvailable = address in timeoutRequests;
  if (! isAddressAvailable){
    let msg = 'Validation request expired !'
    return msg;
    }
  let isValid = bitcoin_message.verify(message, address, signature_String);
  if (! isValid){
    let msg = 'Bitcoin message is not verified with given walled address'
    return msg;
  }
  let data = mempool[address];
  data['messageSignature'] = isValid;
  var tmp = { registar :  true,
              status : data
              }
  mempoolValid[address] = tmp;
  return tmp;
  }

function verifyAddressRequest(address){
  if (address in mempoolValid){
    return true;
  }
  return false;
}

function responseOfAddedBlock(block){
  return {
    hash : block.hash,
    height : block.height,
    body : {
        address : block.body.address,
        star : {
            ra: block.body.star.ra,
            dec: block.body.star.dec,
            story: block.body.star.story,
            storyDecoded: hex2ascii(block.body.star.story)
            }
        },
    time: block.time,
    previousBlockHash: block.previousBlockHash
  };
}
