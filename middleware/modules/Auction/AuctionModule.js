var parent = require('../../core/module');
var auctionClass = require('./models/Auction');
var auctionModel = new auctionClass();
function AuctionModule() {
    parent.apply(this, arguments);
    this.started = null;
    this.events = ['startAuction','updateAuction', 'finishAuction'];
    this.auctionTimer = 3;
}

AuctionModule.prototype = Object.create(parent.prototype);
AuctionModule.prototype.constructor = AuctionModule;

AuctionModule.prototype.createAuction = function(product, basePrice){
    var data = {
        lot: product,
        basePrice: basePrice
    };
    console.log(auctionModel.createEntity(data));
    return auctionModel.createEntity(data);
};
AuctionModule.prototype.setToExpired = function(uid){
    var auction = auctionModel.getEntity(uid);
    clearInterval(auction.intervalId);
    this.dispatchEvent('finishAuction', auction);
};
AuctionModule.prototype.setInterval = function(auction){
    auction.intervalId = setInterval(this.setToExpired.bind(this),1000*this.auctionTimer, auction._uid);
};
//TODO:: set it to model
AuctionModule.prototype.removeAuction = function(id){};
AuctionModule.prototype.startAuction = function(uid){
    var dateSt = new Date();
    var dateFin = new Date();
    dateFin.setSeconds(dateFin.getSeconds() + this.auctionTimer);

    var auction = auctionModel.getEntity(uid);
    auction.startTime = dateSt.toString();
    auction.expiredTime = dateFin.toString();
    this.setInterval(auction);
    this.started = auction;
    this.dispatchEvent('startAuction', auction);
};
AuctionModule.prototype.getCurrent = function(id){
    return this.started;
};

module.exports = AuctionModule;