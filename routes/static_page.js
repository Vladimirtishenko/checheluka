var dateToStart = require('../middleware/services/configOptions'),
    mongoose = require('../lib/mongoose'),
    ordersBucket = require('../middleware/modules/Orders/models/SchemaModel'),
    async = require("async"),
    orders = require('../models/order_save'),
    Rules = require('../models/rules'),
    useragent = require('useragent');

module.exports.get = function(req, res, next) {

    var view = req.originalUrl.slice(1);
    var agent = useragent.parse(req.headers['user-agent']);

    if (req.session.user) {

        async.waterfall([
            dataTry,
            dataOrders,
            AuctionTry,
            getRules
        ], function(err, result) {

            if (view == 'privat' && typeof result.data.orders == 'object') {
                var paid = [],
                    unpaid = [],
                    cancel = [];

                for (var i = 0; i < result.data.orders.length; i++) {
                    if (result.data.orders[i].status == 0) {
                        unpaid.push(result.data.orders[i]);
                    } else if (result.data.orders[i].status == 1) {
                        paid.push(result.data.orders[i]);
                    } else {
                        cancel.push(result.data.orders[i]);
                    }
                }
            }

            res.render(view, {
                title: "Hello Express",
                bucketPrice: result.data.priseSum,
                bucketCount: result.data.count,
                date: result.data.date || "",
                data: result.data.data,
                ordersPaid: (paid && paid.length != 0) ? paid : null,
                ordersUnpaid: (unpaid && unpaid.length != 0) ? unpaid : null,
                ordersCancel: (cancel && cancel.length != 0) ? cancel : null,
                sessionUser: req.session.user,
                rules: result.rules,
                agent: agent
            });
        });

    } else {

        dataTry(function(err, data) {
            if (err) next(err);
            getRules(data, function(err, rules){
                console.log(rules)
                res.render(view, {
                    title: "Hello Express",
                    date: rules.data || "",
                    rules: rules.rules,
                    sessionUser: null
                });
            })
            
        })

    }


    function dataTry(callback) {

        dateToStart.getOption('date', function(err, result) {
            if (err) next(err);
            var params = result && result.params ? result.params : null;
            callback(null, params);
        });

    }

    function dataOrders(date, callback) {
        orders.find({ "userId": req.session.user }, function(err, orders) {
            if (err) next(err);
            callback(null, date, orders);
        })

    }

    function AuctionTry(date, orders, callback) {

        ordersBucket.find({ userId: req.session.user._id }, function(err, data) {
            var priseSum = 0,
                count = 0;

            for (var i = 0; i < data.length; i++) {
                count += data[i].count;
                priseSum += parseInt(data[i].finalePrice) * data[i].count;
            }

            callback(null, { date: date, orders: orders, priseSum: priseSum, count: count, data: view == 'privat' ? data : null });


        })

    }

    function getRules(data, callback) {
        Rules.find({}, function(err, rules) {
            if (err) next(err);
            callback(null, { data: data, rules: rules[0] || {} });
        })
    }


}
