module.exports.get = function(req, res, next) {

	res.render('goods', {
        title: "Hello Express"
    });

}