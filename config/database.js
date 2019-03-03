const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mydb';

// const url = 'mongodb://user1:LeeTu2210@cluster0-shard-00-00-5a4aj.mongodb.net:27017,cluster0-shard-00-01-5a4aj.mongodb.net:27017,cluster0-shard-00-02-5a4aj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(url, function(err, db) {
    if (err) throw err;
  console.log("Database created!");
  });
mongoose.Promise = global.Promise;
module.exports = mongoose;
