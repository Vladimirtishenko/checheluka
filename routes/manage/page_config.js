var mongoose = require('../../lib/mongoose'),
    Config = require('../../models/config'),
    variables = require('../../middleware/variablesHelper');


module.exports.get = function(req, res, next) {

    Config.find({}, function(err, doc) {
        if (err) next(err);

        var variables = variables(doc);

        res.render('index_config', {
            title: "Checheluka Admin",
            variables: variables
        });
    })
}


module.exports.post = function(req, res, next) {

	let configField = Object.keys(req.body)[0],
		configParams = req.body[configField];


	Config.update(
		   { "fieldName" : configField },
		   { $set: { "fieldName" : configField, "params" : configParams} },
		   { upsert:true }, function(err, doc){

		   		if(err) {
		   			res.json({status: 500})
		   		} else{
		   			res.json({status: 200})
		   		}
		   }
		);


}

