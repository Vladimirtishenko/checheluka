module.exports.get = function(req, res, next) {

    res.render('index_manage', {
        title: "Hello Express"
    });

}