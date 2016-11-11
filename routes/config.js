var Config = require('../models/config.js');
var mongoose = require('mongoose');

module.exports.get = function(req, res, next) {

   Config.find({}, function(){

   });

}