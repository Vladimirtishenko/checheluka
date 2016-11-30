var parent = require('../../core/module');
var auctionClass = require('./models/Auction');
var auctionModel = new auctionClass();
function AuctionModule() {
    parent.apply(this, arguments);
    this.started = null;
    this.events = ['startAuction','finishAuction', 'auctionUpdated', 'pretendentAdded'];
    this.auctionTimer = 15;
    this.upPrice = 50;
}

AuctionModule.prototype = Object.create(parent.prototype);
AuctionModule.prototype.constructor = AuctionModule;

AuctionModule.prototype.createAuction = function(product, basePrice){
    var data = {
        lot: product,
        basePrice: basePrice,
        price: basePrice,
        currentPrice: basePrice,
        nextPrice: basePrice + this.upPrice,
        count: 1
    };
    return auctionModel.createEntity(data);
};
AuctionModule.prototype.setToExpired = function(auction){
    var predKeys = Object.keys(auction.pretendents);
    if (predKeys.length > 0 && auction.newPretendentInit === false)
    {
        auction.price = auction.currentPrice;
        auction.currentPrice = auction.nextPrice;
        auction.nextPrice += this.upPrice;
        auction.newPretendentInit = true;
        auctionModel.setTimer(auction, this.auctionTimer, this.setToExpired.bind(this));
        var mess = "Auction for lot - "+auction.lot._id+". Updated timer";
        this.dispatchEvent('auctionUpdated', auction, mess);
    }
    else
    {
        auction.winner = this.getWinner(auction._uid);
        var mess = "Auction for lot - "+auction.lot._id+" was finished";
        this.started = null;
        this.dispatchEvent('finishAuction', auction, mess);
    }
};
//TODO:: set it to model
AuctionModule.prototype.removeAuction = function(uid){
    auctionModel.removeEntity(uid);
};
AuctionModule.prototype.startAuction = function(uid){
    var auction = auctionModel.getEntity(uid);
    //set default data
    auction.price = auction.basePrice;
    auction.count = 1;
    auction.currentPrice = auction.basePrice;
    auction.nextPrice =  auction.basePrice + this.upPrice;
    auction.winner = null;
    auction.pretendents = {};
    auction.newPretendentInit = false;
    //
    auctionModel.setTimer(auction, this.auctionTimer, this.setToExpired.bind(this));
    this.started = auction;
    var mess = "Auction for lot - "+auction.lot._id+" was started. currentPrice - "+auction.currentPrice;
    this.dispatchEvent('startAuction', auction, mess);
};
AuctionModule.prototype.getCurrent = function(){
    return this.started;
};

AuctionModule.prototype.setPretendent = function(uid, user){
    var auction = auctionModel.getEntity(uid);
    if (typeof auction.pretendents[user._id] !== 'undefined')
    {
        return false;
    }
    if (auction.newPretendentInit)
    {
        auction.pretendents = {};
    }
    auction.newPretendentInit = false;
    auction.pretendents[user._id] = user;
    var mess = "New pretendent - "+user._id+". Price - "+auction.currentPrice;
    this.dispatchEvent('pretendentAdded', auction, mess);
    return true;
};

AuctionModule.prototype.setCount = function(uid, count, user){
    var auction = auctionModel.getEntity(uid);
    if (!auction || auction.count > count)
    {
        return false;
    }
    else if (auction.count == count)
    {
        this.setPretendent(uid, user);
        return true;
    }
    auction.count = count;
    auction.newPretendentInit = true;
    auctionModel.updateTimer(auction, this.auctionTimer);
    this.setPretendent(uid, user);
    var mess = "Pretendent updated auction - "+auction.lot._id+" count";
    this.dispatchEvent('auctionUpdated', auction, mess);
    return true;
};

AuctionModule.prototype.setPrice = function(uid, price, user){
    var auction = auctionModel.getEntity(uid);
    if (!auction || auction.nextPrice > price)
    {
        return false;
    }
    auction.price = price;
    auction.currentPrice = price;
    auction.nextPrice = auction.currentPrice + this.upPrice;
    auction.newPretendentInit = true;
    auctionModel.updateTimer(auction, this.auctionTimer);
    if ( this.setPretendent(uid, user))
    {
        var mess = "Pretendent updated auction - "+auction.lot._id+" price";
        this.dispatchEvent('auctionUpdated', auction, mess);
        return true;
    }
};

AuctionModule.prototype.getWinner = function(uid){
    var auction = auctionModel.getEntity(uid);
    var keys = Object.keys(auction.pretendents);
    var winners = (keys.length > 0) ? {} : null;
    shuffle(keys);
    var winnerCounts = Math.floor(auction.lot.countInWarehouse / auction.count);
    console.log(winnerCounts);
    keys = keys.slice(0, winnerCounts);
    for (var i = 0; i < keys.length; i++)
    {
        winners[keys[i]] = auction.pretendents[keys[i]]
    }
    return winners || null;
};

AuctionModule.prototype.dispatchEvent = function(eventName, auction, historyMessage){
    auction.history.push({action:eventName, data:historyMessage});
    var sended = JSON.parse(JSON.stringify(auction));
    delete sended.history;
    if (eventName == 'startAuction')
    {
        auction.status = 'started';
        sended.status = 'started';
        var dateSt = new Date();
        auction.stDateTime = dateSt.toString();
        return this._base_dispatchEvent(eventName, sended);
    }
    if (eventName == 'finishAuction')
    {
        var dateFin = new Date();
        auction.status = 'finished';
        sended.status = 'finished';
        auction.finDateTime = dateFin.toString();
        if (auction.winner && auction.winner._id)
        {
            auctionModel.saveToStorage(auction, function(result){
                if (result)
                {
                    sended._id = result._id;
                    this._base_dispatchEvent(eventName, sended);
                }
                //auctionModel.removeEntity(auction._uid);
            }.bind(this))
        }
        else{
            //auctionModel.removeEntity(auction._uid);
            this._base_dispatchEvent(eventName, sended);
        }
        return;
    }
    else{
        return this._base_dispatchEvent(eventName, sended);
    }
};
AuctionModule.prototype._base_dispatchEvent = parent.prototype.dispatchEvent;

AuctionModule.prototype.removeAuctionFrom = function(uid){
    auctionModel.removeEntity(uid);
};

module.exports = AuctionModule;

/**
 * Shuffles array in place.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}