module.exports.get = function(req, res, next) {
	
    res.render('index', {
        title: "Hello Express"
    });

}
