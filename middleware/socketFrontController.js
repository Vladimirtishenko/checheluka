var aucMod = require('./modules/Auction/AuctionModule');
var prodModule = require('./modules/Product/ProductModule');
var usersClass = require('./modules/Users/UsersModule');
var auctionModule = new aucMod();
var productsModule = new prodModule();
var usersModule = new usersClass();
var cookie = require('cookie');
var socketClient = require('./services/socketClient');
var loadProductSleepTime = 5; // if product did not loaded server slepp for $ sec

function socketFrontController(io){
    this.io = io;
    //set starting data
    this.pro = {
        auctionPrice: 10,
        title: 'qqq',
        description: 'wq',
        color: '12',
        size: 'L',
        countInWarehouse: 1
    };
    this.limit = 10;
    this.offset = 0;
    this.diffToLoad = 5;
    this.productsPull = {};
    this.auctionsPull = {};
    productsModule.setListenere("productsLoaded",this.setProductList.bind(this));
    auctionModule.setListenere("finishAuction",this.sendNotifyThatAuctionFinished.bind(this));
    auctionModule.setListenere("auctionUpdated",this.notifyAuctionUpdated.bind(this));
    auctionModule.setListenere("startAuction",this.notifyAuctionStarted.bind(this));
    this.clients = [];
    //initialyze client connection
    io.on('connection', function(socket){
        var newClient = new socketClient(socket);
        this.clients[newClient.getId()] = newClient;
        newClient.setEvent('login', this.login.bind(this));
        newClient.setEvent('register_user', this.register_user.bind(this));
        newClient.setEvent('getUserData', this.getUserData.bind(this));
        newClient.setEvent('baseBuy', this.baseBuy.bind(this));
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

socketFrontController.prototype.getAuctions = function(msg){
    this.send(productsModule.getProducts());
}
socketFrontController.prototype.getAuctionStatus = function(client, data){

}
socketFrontController.prototype.getCurrentAuction = function(){


}
socketFrontController.prototype.getAuctionHistory = function(){


}
socketFrontController.prototype.baseBuy = function(client, data){
    var action = 'baseBuy';
    if (!client.isAutorize())
    {
        return this.sendNotAutorize(client, 'baseBuy');
    }
    var response = {result:'success'};
    var auc = auctionModule.getCurrent();
    if (auc.uid != data.auction_id)
    {
        response = {error: 'Auction with auction_id = '+data.auction_id+' not found'};
        return client.socket.emit('serverMessage', this.createMessage(action, response));
    }
    if (!auctionModule.setPretendent(auc._uid, client.getUserData()))
    {
        response = {error: 'You are already pretendent for this lot'};
    }
    client.socket.emit('serverMessage', this.createMessage(action, response));
}

socketFrontController.prototype.createMessage = function(action, params){
    console.log(params);
    return {
        action: action,
        data: params
    };
}

socketFrontController.prototype.productLoad = function(){
    //TODO::calculate offset limit
    productsModule.loadProducts(this.offset, this.limit);
}

socketFrontController.prototype.setProductList = function(event, products){
    this.pro.auctionPrice +=1;
    this.pro.title +='qw_';
    this.pro.countInWarehouse +=1;
    //productsModule.createProduct(this.pro);
    if (products && products.length > 0)
    {
        this.offset += products.length;
        for(var i = 0; i < products.length; i++)
        {
            this.productsPull[products[i]._id] = products[i];
        }
        this.setAuctionList();
    }
    else
    {
        setInterval(this.productLoad.bind(this),1000*loadProductSleepTime);
    }
}

socketFrontController.prototype.setAuctionList = function(){
    for(var i in this.productsPull)
    {
        if (this.productsPull.hasOwnProperty(i))
        {
            var auc = auctionModule.createAuction(this.productsPull[i], this.productsPull[i].auctionPrice);
            this.auctionsPull[auc._uid] = auc;
        }
    }
    var keys = Object.keys(this.auctionsPull);
    if (typeof keys[0] !== 'undefined')
    {
        auctionModule.startAuction(this.auctionsPull[keys[0]]._uid);
    }
}

socketFrontController.prototype.sendNotifyThatAuctionFinished = function(event, data){
    delete this.auctionsPull[data._uid];
    var keys = Object.keys(this.auctionsPull);
    if (typeof keys[0] !== 'undefined')
    {
        auctionModule.startAuction(this.auctionsPull[keys[0]]._uid);
    }
    delete this.productsPull[data.lot._id];
    var keys = Object.keys(this.productsPull);
    if (keys.length < this.limit - this.diffToLoad)
    {
        this.productLoad();
    }
    this.sendToAll(this.createMessage('auctionFinished', data));
}

socketFrontController.prototype.notifyAuctionUpdated = function(event, data){
    this.sendToAll(this.createMessage('auctionUpdated', data));
}

socketFrontController.prototype.notifyAuctionStarted = function(event, data){
    this.sendToAll(this.createMessage('actionStarted', data));
}

socketFrontController.prototype.sendToAll = function(message){
    this.io.sockets.emit('serverMessage', message);
}
socketFrontController.prototype.sendNotAutorize = function(client, action){
    var mes = {error: 'Not autorize!!!'};
    client.socket.emit('serverMessage', this.createMessage(action, mes));
}

module.exports = socketFrontController;