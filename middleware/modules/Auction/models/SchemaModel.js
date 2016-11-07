/**
 * Created by maxim.bondarenko on 07/11/2016.
 */
var mongoose = require('../../../../lib/mongoose');
var schema = mongoose.Schema({
    productId:String,
    finalePrice: {type: Number, default: 1},
    status:String,
    winnerUserId:{type: String, default: null},
    stDateTime: Date,
    finDateTime: Date,
    count: {type: Number, default: 1},
    history:  [{
        action: String,
        data: String
    }]
}, { collection: 'auctions' });
// Model
module.exports = mongoose.model('auctions', schema);