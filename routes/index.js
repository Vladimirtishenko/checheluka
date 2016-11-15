var dateToStart = require('../middleware/services/configOptions'),
	variables = require('../middleware/variablesHelper');

module.exports.get = function(req, res, next) {

	console.log(req);

	dateToStart.getOption('date', function (err, date) {
		if(err) next(err);

		var params = variables(date);

	  	res.render('index', {
        	title: "Hello Express",
        	date: params.date || "" 
    	});
	});

    
}
