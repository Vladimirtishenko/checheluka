var mongoose = require('mongoose');
var config = require('../config');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// db.on('connecting', function() {
//     console.log('connecting to MongoDB...');
// });
//
// db.on('error', function(error) {
//     console.error('Error in MongoDb connection: ' + error);
//     mongoose.disconnect();
// });
// db.on('disconnected', function() {
//     console.log('MongoDB disconnected!');
//     mongoose.connect(config.get("mongoose:uri"), {server:{auto_reconnect:true}});
// });
mongoose.connect(config.get("mongoose:uri"), {server:{auto_reconnect:true}});
module.exports = mongoose;