var parent = require('../../core/module');
var auctionClass = require('./models/Auction');
var auctionModel = new auctionClass();
function AuctionModule() {
    parent.apply(this, arguments);
    this.started = null;
    this.events = ['startAuction','finishAuction', 'auctionUpdated'];
    this.auctionTimer = 30;
    this.upPrice = 50;
}

AuctionModule.prototype = Object.create(parent.prototype);
AuctionModule.prototype.constructor = AuctionModule;

AuctionModule.prototype.createAuction = function(product, basePrice){
    var data = {
        lot: product,
        basePrice: basePrice,
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
        this.dispatchEvent('finishAuction', auction, mess);
    }
};
//TODO:: set it to model
AuctionModule.prototype.removeAuction = function(uid){
    auctionModel.removeEntity(uid);
};
AuctionModule.prototype.startAuction = function(uid){
    var auction = auctionModel.getEntity(uid);
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
    this.dispatchEvent('auctionUpdated', auction, mess);
    return true;
};

AuctionModule.prototype.getWinner = function(uid){
    var auction = auctionModel.getEntity(uid);
    var keys = Object.keys(auction.pretendents);
    var ind = keys[Math.floor(Math.random()*keys.length)];
    return auction.pretendents[ind] || null;
};

AuctionModule.prototype.dispatchEvent = function(eventName, auction, historyMessage){
    auction.history.push({action:eventName, data:historyMessage});
    if (eventName == 'startAuction')
    {
        auction.status = 'started';
        var dateSt = new Date();
        auction.stDateTime = dateSt.toString();
    }
    if (eventName == 'finishAuction')
    {
        var dateFin = new Date();
        auction.status = 'finished';
        auction.finDateTime = dateFin.toString();
        if (auction.winner && auction.winner._id)
        {
            auctionModel.saveToStorage(auction, function(result){
                auctionModel.removeEntity(auction._uid)
            })
        }
        else{
            auctionModel.removeEntity(auction._uid)
        }
    }
    var sended = JSON.parse(JSON.stringify(auction));
    delete sended.history;
    this._base_dispatchEvent(eventName, sended);
};
AuctionModule.prototype._base_dispatchEvent = parent.prototype.dispatchEvent;

module.exports = AuctionModule;