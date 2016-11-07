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
        nextPrice: basePrice + this.upPrice
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
        this.dispatchEvent('auctionUpdated', auction);
    }
    else
    {
        auction.winner = this.getWinner(auction._uid);
        this.dispatchEvent('finishAuction', auction);
    }
};
//TODO:: set it to model
AuctionModule.prototype.removeAuction = function(id){};
AuctionModule.prototype.startAuction = function(uid){
    var dateSt = new Date();
    var dateFin = new Date();
    dateFin.setSeconds(dateFin.getSeconds() + this.auctionTimer);

    var auction = auctionModel.getEntity(uid);
    auction.startTime = dateSt.toString();
    //auction.expiredTime = dateFin.toString();
    auctionModel.setTimer(auction, this.auctionTimer, this.setToExpired.bind(this));
    this.started = auction;
    this.dispatchEvent('startAuction', auction);
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
    this.dispatchEvent('auctionUpdated', auction);
    return true;
};

AuctionModule.prototype.getWinner = function(uid){
    var auction = auctionModel.getEntity(uid);
    var keys = Object.keys(auction.pretendents);
    var ind = keys[Math.floor(Math.random()*keys.length)]; 
    return auction.pretendents[ind];
};

module.exports = AuctionModule;