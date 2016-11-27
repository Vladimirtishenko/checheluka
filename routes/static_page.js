var dateToStart = require('../middleware/services/configOptions'),
    mongoose = require('../lib/mongoose'),
    ordersBucket = require('../middleware/modules/Orders/models/SchemaModel'),
    async = require("async"),
    orders = require('../models/order_save');

module.exports.get = function(req, res, next) {

    var view = req.originalUrl.slice(1);

    if (req.session.user) {

        async.waterfall([
            dataTry,
            dataOrders,
            AuctionTry
        ], function(err, result) {

            if(view == 'privat' && typeof result.orders == 'object'){
                var paid = [],
                    unpaid = [],
                    cancel = [];

                for (var i = 0; i < result.orders.length; i++) {
                    if(result.orders[i].status == 0){
                        unpaid.push(result.orders[i]);
                    } else if (result.orders[i].status == 1) {
                        paid.push(result.orders[i]);
                    } else {
                        cancel.push(result.orders[i]);
                    }
                }
            }

            res.render(view, {
                title: "Hello Express",
                bucketPrice: result.priseSum,
                bucketCount: result.count,
                date: result.date || "",
                data: result.data,
                ordersPaid: (paid && paid.length != 0) ? paid : null,
                ordersUnpaid: (unpaid && unpaid.length != 0) ? unpaid : null,
                ordersCancel: (cancel && cancel.length != 0) ? cancel : null,
                sessionUser: req.session.user
            });
        });

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


    function dataTry(callback) {

        dateToStart.getOption('date', function(err, result) {
            if (err) next(err);
            var params = result && result.params ? result.params : null;
            callback(null, params);
        });

    }

    function dataOrders(date, callback) {
        orders.find({"userId": req.session.user}, function(err, orders){
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


}
