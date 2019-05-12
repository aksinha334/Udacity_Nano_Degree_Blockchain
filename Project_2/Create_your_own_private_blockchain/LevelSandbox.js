/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key){
        let self = this;
        return new Promise(function(resolve, reject){
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.get(key,(error,value) =>{
              if(error) {
                reject(error);
              }
              resolve(value);
            });
          });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.put(key, value, function(error){
              if(error){
                console.log('Block Number' + key + ' submission failed..Error '+error );
                reject(error);
              }
              resolve(value);
            });
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        let length = -1;
        return new Promise(function(resolve, reject){
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.createReadStream()
              .on('data',function(data){
                ++length;
              })
              .on('error',function(error){
                reject(error);
              })
              .on('end',function(){
                resolve(length);
              });
            });
    }

}

module.exports.LevelSandbox = LevelSandbox;
