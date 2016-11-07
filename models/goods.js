var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	title:String,
	description: String,
	src: String,
	size: String,
	color: String,
	consistOf: String,
	material: String,
	countInWarehouse: {type: Number, default: 0},
	auctionPrice: {type: Number, default: 0},
	price: {type: Number, default: 0},
	priority: Boolean
});


exports.Goods = mongoose.model("Goods", schema);