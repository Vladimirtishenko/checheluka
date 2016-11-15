var mongoose = require('../../lib/mongoose'),
	configOptions = require('../../middleware/services/configOptions'),
    variables = require('../../middleware/variablesHelper');


module.exports.get = function(req, res, next) {

	configOptions.getOptions(function(err, doc) {
        if (err) next(err);

        var params = variables(doc);

        res.render('index_config', {
            title: "Checheluka Admin",
            variables: params
        });
    })
}


module.exports.post = function(req, res, next) {

	var configField = Object.keys(req.body)[0],
		configParams = req.body[configField];


	configOptions.saveOption(
		    configField,
			configParams,
			function(err, doc){
		   		if(err) {
		   			res.json({status: 500})
		   		} else{
		   			res.json({status: 200})
		   		}
		   }
		);


}

