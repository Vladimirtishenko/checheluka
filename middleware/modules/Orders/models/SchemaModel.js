/**
 * Created by maxim.bondarenko on 07/11/2016.
 */
var mongoose = require('../../../../lib/mongoose');
var schema = mongoose.Schema({
    userId:String,
    auctionId: String,
    createdDate: Date,
    status:{type: String, default: 'new'}
}, { collection: 'orders' });
// Model
module.exports = mongoose.model('orders', schema);