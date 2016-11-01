var aucMod = require('./modules/Auction/AuctionModule');
var prodModule = require('./modules/Product/ProductModule');
var auctionModule = new aucMod();
var productsModule = new prodModule();
function socketFrontController(io){

    this.socket = {};
    productsModule.setListenere("productsLoaded",this.setAuctionList.bind(this));
    auctionModule.setListenere("finishAuction",this.sendNotifyThatAuctionFinished.bind(this));
    io.on('connection', function(socket){
        this.socket = socket;
        socket.on('chat message', this.getTheMessage);
        socket.on('getAuctions', this.getAuctions);
        socket.on('getAuctionStatus', this.getAuctionStatus);
        socket.on('upPrice', this.upPrice);
        socket.on('getAuctionHistory', this.getAuctionHistory);
        socket.on('getCurrentAuction', this.getCurrentAuction);
    }.bind(this));
    this.productLoad();
}


socketFrontController.prototype.getTheMessage = function(msg){

    console.log(msg);

    //io.emit('chat message', msg); // send all users

}

socketFrontController.prototype.getAuctions = function(msg){
    this.send(productsModule.getProducts());
}
socketFrontController.prototype.getAuctionStatus = function(){


}
socketFrontController.prototype.getCurrentAuction = function(){


}
socketFrontController.prototype.getAuctionHistory = function(){


}
socketFrontController.prototype.upPrice = function(){


}

socketFrontController.prototype.send = function(message){

    this.socket.emit('serverMessage', message);
}

socketFrontController.prototype.productLoad = function(){
    //TODO::calculate offset limit
    productsModule.loadProducts('/allGoodsAuction?start=0');
}

socketFrontController.prototype.setAuctionList = function(event, data){
    var auc = auctionModule.createAuction({1:333},12);
    auctionModule.startAuction(auc._uid);
}

socketFrontController.prototype.sendNotifyThatAuctionFinished = function(event, data){
    console.log('auction finished');
    console.log(data);
    this.send(data);
}
module.exports = socketFrontController;