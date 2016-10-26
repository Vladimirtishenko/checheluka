var mongoose = require("../lib/mongoose"),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	src: {
		type: String
	},
	size: {
		type: String
	},
	color: {
		type: String
	},
	consistOf: {
		type: String
	},
	material: {
		type: String
	},
	countInWarehouse: {
		type: String
	},
	priority: {
		type: Boolean
	}
});


exports.Goods = mongoose.model("Goods", schema);