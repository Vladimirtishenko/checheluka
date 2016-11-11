var parent = require('../../../core/model');
var mongoose = require('../../../../lib/mongoose');
var dProv = require('./SchemaModel');
function Orders() {
    parent.apply(this, arguments);
    // Model
    this.dataProvider = dProv;
    this.requiredFields = ["userId","auctionId"];
    this.entityData = {
        userId: null,
        auctionId: null,
        createdDate: new Date(),
        status: 'new'
    }
}
Orders.prototype = Object.create(parent.prototype);

Orders.prototype.saveToStorage = function(entity, callback)
{
    this.dataProvider.create(entity,function(err){
        console.log(err);
        if(err) return callback(false);
        return callback(true);
    });
    return;
};

module.exports = Orders;