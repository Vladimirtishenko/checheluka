module.exports.get = function(req, res, next) {

	res.render('comments', {
        title: "Hello Express"
    });

}