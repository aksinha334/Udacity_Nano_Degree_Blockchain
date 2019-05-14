const datapath = './database'
const level = require('level')
const db = level(datapath)

class Database {
  constructor() {
  }

  getDataDB(key) {
    return new Promise(function(resolve, reject) {
      db.get(key,(error, value)=> {
        if (error){
          return reject(error);
        }
        else{
          return resolve(value);
        }
      });
    });
  }

  getHeightDB(){
    let length = -1;
    return new Promise(function(resolve, reject) {
      db.createReadStream()
        .on('data',function(data){
          ++length;
        })
        .on('error', function(error){
          return reject(error);
        })
        .on('end', function(){
          return resolve(length);
        });
    });
  }

  addBlockDB(key, value){
    return new Promise(function(resolve, reject) {
      db.put(key, function(WS) => {})
    });
  }

}
