var mongoose = require('../../lib/mongoose'),
	configOptions = require('../../middleware/services/configOptions');


module.exports.get = function(req, res, next) {

	configOptions.getOption('date', function(err, result) {
        if (err) next(err);
        res.render('index_config', {
            title: "Checheluka Admin",
            params: result.params
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

