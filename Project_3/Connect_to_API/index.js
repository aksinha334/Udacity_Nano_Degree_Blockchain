const Blockchain = require('./BlockChain.js');
const express = require('express');
const bodyparser = require('body-parser')
const Block = require('./Block.js');
const app = express()


app.get('/block/:index',(req, res) => {
  let height = req.params.index;
  let block_json;
  let blockchain = new Blockchain.Blockchain();
  blockchain.getBlock(height).then((block) => {
    res.send(block);
  }).catch((err) => {console.log(err);
                      res.send(err);});
});

app.use(bodyparser.json());
app.post('/block/',(req, res) => {
  let req_body = req.body;
  console.log(req_body);
  let data = req_body.data;
  if ( !data){
    res.send('No payload available');
    return
  }
  let blockchain = new Blockchain.Blockchain();
  let block = new Block.Block(data);
  blockchain.addBlock(block).then(() => {
    res.send('Added the block');
  }).catch((err) => {console.log(err);
                     res.send('Error Found');});
});


app.listen(8000);
