var dateToStart = require('../middleware/services/configOptions'),
    ordersBucket = require('../middleware/modules/Orders/models/SchemaModel'),
    orders = require('../models/order_save');


module.exports.post = function(req, res, next) {

    if (req.session.user) {

        var data = req.body,
            orderNumberTry = 1;

        data.userId = req.session.user._id;
        data.email = req.session.user.email;

        orders.find({}, function(err, doc) {

            if (typeof doc[0] == 'object') {
                orderNumberTry = isNaN(parseInt(doc[0].orderNumber)) ? 1 : parseInt(doc[0].orderNumber) + 1;
            }

            data.orderNumber = orderNumberTry;

            saveInDb(data);


        }).sort({ _id: -1 }).limit(1);


    } else {
        dataTry(function(err, data) {
            if (err) next(err);
            res.render(view, {
                title: "Hello Express",
                date: data || "",
                sessionUser: null
            });
        })

    }

    function saveInDb(data) {
        orders.update({ "orderNumber": data.orderNumber }, data, { upsert: true }, function(err, save) {
            if (err) {
                res.json({ status: 500 });
            } else {
                ordersBucket.remove({ userId: { $in: data.userId } }, function(err, response) {
                    if (err) {
                        res.json({ status: 500 });
                    } else {
                        res.json({ status: 200 });
                    }
                });
            }

        });
    }


    function dataTry(callback) {

        dateToStart.getOption('date', function(err, result) {
            if (err) next(err);
            callback(null, result.params);
        });

    }

}
