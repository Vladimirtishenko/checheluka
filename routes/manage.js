var path = require('path');
var Goods = require('../models/goods').Goods;

module.exports.get = function(req, res, next) {

	res.render('index_manage', {
        title: "Hello Express"
    });

}

module.exports.post = function(req, res, next){


	Goods.collection.insert(req.body, onInsert);

	function onInsert(err, docs) {
	    if (err) {
	        // TODO: handle error
	    } else {
	        console.log(docs)
	    }
	}

}