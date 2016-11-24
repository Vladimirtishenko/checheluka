var mongoose = require('../lib/mongoose');
var schema = mongoose.Schema({
	userId: String,
	orderNumber: Number,
	date: Date,
	status: Number,
    country:String,
    sity: String,
    fio: String,
    priceCommon: Number,
    delivery: String,
    warehouse: String,
    number: String,
    goods: Object,
    email: String,
    color: String,
    size: String,
    art: String
}, { collection: 'order_save' });
// Model
module.exports = mongoose.model('order_save', schema);