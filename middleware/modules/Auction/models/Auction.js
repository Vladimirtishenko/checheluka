var parent = require('../../../core/model');
function Auction() {
    parent.apply(this, arguments);
    this.entityData = {
        lot: {},
        startTime: null,
        expiredTime: null,
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
}


module.exports = Auction;