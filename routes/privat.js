module.exports.get = function(req, res, next) {

	res.render('privat', {
        title: "Hello Express"
    });

}