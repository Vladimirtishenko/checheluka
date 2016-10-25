var Goods = require('../models/goods').Goods;

module.exports.get = function(req, res, next) {

    var params = {
        start: req.query.start || 0
    };


    Goods.find({}, function(err, doc) {

        if (err) {
            next(err);
        }

        res.json({ goods: doc, offset: params.start + 20 });


    }).limit(20).skip(parseInt(params.start));


}
