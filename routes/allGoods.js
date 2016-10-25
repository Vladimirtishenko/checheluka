var Goods = require('../models/goods').Goods;
var each = require('async/each');

module.exports.post = function(req, res, next) {


    each(req.body, function(file, callback) {


        Goods.findOneAndUpdate({ "title": file.title, "color": file.color, "size": file.size }, file, {upsert: true, new: true}, function(err, doc){
        	if(err){
        		callback(err);
        	} else {
        		callback();
        	}
		});


    }, function(err) {
        if (err) {
            res.json({err: err})
        } else {
            res.json({status: 200})
        }
    });




}
