/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/
const path = require('path');
const level = require('level');
const chainDB = './chaindata';
// let dbPath = process.env.DB_PATH || path.join(__dirname, 'mydb');
const db = level(chainDB);
class LevelSandbox {

    constructor() {

    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key){
        return new Promise(function(resolve, reject){
            // Add your code here, remember in Promises you need to resolve() or reject()
            db.get(key,(error,value) =>{
              if(error) {
                return reject(error);
              }
              return resolve(value);
            });
          });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        return new Promise(function(resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            db.put(key, value, function(error){
              if(error){
                console.log('Block Number' + key + ' submission failed..Error '+error );

                return reject(error);
              }

              return resolve(value);
            });
        });
    }

    // Method that return the height
    getBlocksCount() {
        let length = -1;

        return new Promise(function(resolve, reject){
            // Add your code here, remember in Promises you need to resolve() or reject()
            db.createReadStream()
              .on('data',function(data){
                ++length;
              })
              .on('error',function(error){

                return reject(error);
              })
              .on('end',function(){

                return resolve(length);
              });
            });
    }

}

module.exports.LevelSandbox = LevelSandbox;
