var aucMod = require('./modules/Auction/AuctionModule');
var prodModule = require('./modules/Product/ProductModule');
var usersClass = require('./modules/Users/UsersModule');
var auctionModule = new aucMod();
var productsModule = new prodModule();
var usersModule = new usersClass();
var cookie = require('cookie');
var socketClient = require('./services/socketClient');
function socketFrontController(io){
    productsModule.setListenere("productsLoaded",this.setAuctionList.bind(this));
    auctionModule.setListenere("finishAuction",this.sendNotifyThatAuctionFinished.bind(this));
    this.clients = [];
    io.on('connection', function(socket){
        var newClient = new socketClient(socket);
        this.clients[newClient.getId()] = newClient;
        newClient.setEvent('chat message', this.getTheMessage.bind(this));
        newClient.setEvent('login', this.login.bind(this));
        newClient.setEvent('register_user', this.register_user.bind(this));
        newClient.setEvent('getUserData', this.getUserData.bind(this));
    }.bind(this));
    this.productLoad();
}

socketFrontController.prototype.login = function(client, data){
    if (client.isAutorize())
    {       
        client.socket.emit('serverMessage', this.createMessage('autoryze', client.getUserData()));
    }
    //set listner for completed autorization
    usersModule.setListenere("autoryzeCompleted",function(event, data){
        client.setUserData(data);
        client.socket.emit('serverMessage', this.createMessage('autoryze', data));
        usersModule.unsetListener(event);
    }.bind(this));

    //call autorization
    usersModule.autoryze(data.email, data.pass);
}

socketFrontController.prototype.getUserData = function(msg){
    client.socket.emit('serverMessage', this.createMessage('getUserData', client.getUserData()));
    //io.emit('chat message', msg); // send all users

}


socketFrontController.prototype.register_user = function(client, data){
    //set listner for completed creating user
    usersModule.setListenere("userCreated",function(event, data){
        client.socket.emit('serverMessage', this.createMessage('registration', data));
        usersModule.unsetListener(event);
    }.bind(this));

    //call registration
    usersModule.registerUser(data.uname, data.email, data.pass);
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

socketFrontController.prototype.createMessage = function(action, prams){

    var mess = {
        action: action,
        data: prams
    };
    return mess;
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
    //this.send(data);
}
module.exports = socketFrontController;