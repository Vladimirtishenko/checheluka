/**
 * Created by maxim.bondarenko on 07/11/2016.
 */
var mongoose = require('../../../../lib/mongoose');
var schema = mongoose.Schema({
    userId:String,
    auctionId: String,
    productId:String,
    image:String,
    title:String,
    finalePrice: String,
    size:String,
    count: {type: Number, default: 1},
}, { collection: 'orders' });
// Model
module.exports = mongoose.model('orders', schema);