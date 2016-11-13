var mongoose = require('../lib/mongoose'),
    Config = require('../models/config');

module.exports = function(callback){
	Config.find({'fieldName': 'date'}, function(err, date){
		callback(err, date);
	})
}