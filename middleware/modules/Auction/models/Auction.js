var parent = require('../../../core/model');
var mongoose = require('../../../../lib/mongoose');
var dProv = require('./SchemaModel');
function Auction() {
    parent.apply(this, arguments);
    // Model
    this.dataProvider = dProv;
    this.entityData = {
        lot: {},
        stDateTime: null,
        finDateTime: null,
        count: 1,
        basePrice: 0,
        currentPrice: 0,
        nextPrice: 0,
        pretendents: {},
        winner: {},
        status: 'new',
        newPretendentInit: false,
        history: [],
        timer: 0
    }
}
Auction.prototype = Object.create(parent.prototype);
Auction.prototype.setTimer = function(entity, timer, callback)
{
    entity.timer = timer;
    var intervel = null;
    var func = function(){
        entity.timer--;
        if (entity.timer == 0)
        {
            clearInterval(entity.intervel);

            callback(entity);
        }
    };
    intervel = setInterval(func,1000);
};

Auction.prototype.saveToStorage = function(entity, callback)
{
    var data = {
        productId: entity.lot._id,
        finalePrice: entity.currentPrice,
        status: entity.status,
        winnerUserId: (entity.winner && entity.winner._id) ? entity.winner._id : null,
        stDateTime: entity.stDateTime,
        finDateTime: entity.finDateTime,
        history: entity.history,
        count: entity.count
    };
    this.dataProvider.create(data,function(err){
        if(err) return callback(false);
        return callback(true);
    });
    return;
};

module.exports = Auction;