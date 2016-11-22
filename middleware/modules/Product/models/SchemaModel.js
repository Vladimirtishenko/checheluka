/**
 * Created by maxim.bondarenko on 07/11/2016.
 */
var mongoose = require('../../../../lib/mongoose');
var schema = mongoose.Schema({
    title:String,
    description: String,
    src: String,
    size: String,
    color: String,
    consistOf: String,
    material: String,
    countInWarehouse: {type: Number, default: 1},
    auctionPrice: {type: Number, default: 30},
    price: {type: Number, default: 0},
    priority: {type: Number, default: 0},
    date: Date
}, { collection: 'goods' });
// Model
module.exports = mongoose.model('goods', schema);