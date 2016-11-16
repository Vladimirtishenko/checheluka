var dateToStart = require('../middleware/services/configOptions');

module.exports.get = function(req, res, next) {


	console.log(req.session)

	dateToStart.getOption('date', function (err, result) {
		if(err) next(err);

	  	res.render('index', {
        	title: "Hello Express",
        	date:  result.params || "" 
    	});
	});

    
}
