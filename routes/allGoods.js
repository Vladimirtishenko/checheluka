var Goods = require('../models/goods').Goods;
var each = require('async/each');
var mongoose = require('mongoose');

module.exports.post = function(req, res, next) {


    each(req.body, function(file, callback) {

        var _id = file._id || new mongoose.mongo.ObjectID();

        Goods.findOneAndUpdate({
            _id: _id
        }, file, { upsert: true, new: true }, function(err, doc) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });


    }, function(err) {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ status: 200 })
        }
    });


}

module.exports.delete = function(req, res, next) {
    var _id = req.body._id;


    Goods.remove({ _id: _id }, function(err) {
        if (err) {
            res.json({ err: err })
        } else {
            res.json({ status: 200 })
        }
    });

}
