var dateToStart = require('../middleware/getDateToStart'),
	variables = require('../middleware/variablesHelper');

module.exports.get = function(req, res, next) {

	console.log(req);

	dateToStart(function (err, date) {
		if(err) next(err);

		var params = variables(date);

	  	res.render('index', {
        	title: "Hello Express",
        	date: params.date || "" 
    	});
	});

    
}
