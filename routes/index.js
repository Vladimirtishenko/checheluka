module.exports.get = function(req, res, next) {
	

	console.log(req);


    res.render('index', {
        title: "Hello Express"
    });

}
