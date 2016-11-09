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
    this.limit = 4;
    this.offset = 0;
    this.productsPull = {};
    this.auctionsPull = {};
    this.curAuction = null;
    productsModule.setListenere("productsLoaded",this.setProductList.bind(this));
    auctionModule.setListenere("finishAuction",this.sendNotifyThatAuctionFinished.bind(this));
    auctionModule.setListenere("auctionUpdated",this.notifyAuctionUpdated.bind(this));
    auctionModule.setListenere("startAuction",this.notifyAuctionStarted.bind(this));
    //initialyze client connection
    io.on('connection', function(socket){
        var newClient = new socketClient(socket);
        //this.clients[newClient.getId()] = newClient;
        newClient.setEvent('login', this.login.bind(this));
        newClient.setEvent('register_user', this.register_user.bind(this));
        newClient.setEvent('baseBuy', this.baseBuy.bind(this));
        newClient.setEvent('getCurrentAuction', this.getCurrentAuction.bind(this));
        newClient.setEvent('getAuctions', this.getAuctions.bind(this));
    }.bind(this));
    this.productLoad();
}

socketFrontController.prototype.login = function(client, data){
    if (client.isAutorize())
    {       
        client.socket.emit('serverMessage', this.createMessage('login', client.getUserData()));
    }
    //set listner for completed autorization
    usersModule.setListenere("autoryzeCompleted",function(event, data){
        client.setUserData(data);
        client.socket.emit('serverMessage', this.createMessage('login', data));
        usersModule.unsetListener(event);
    }.bind(this));

    //call autorization
    usersModule.autoryze(data.email, data.pass);
}

socketFrontController.prototype.register_user = function(client, data){
    //set listner for completed creating user
    usersModule.setListenere("userCreated",function(event, data){
        client.socket.emit('serverMessage', this.createMessage('register_user', data));
        usersModule.unsetListener(event);
    }.bind(this));

    //call registration
    usersModule.registerUser(data.uname, data.email, data.pass);
}

socketFrontController.prototype.getAuctions = function(client, data){
    client.socket.emit('serverMessage', this.createMessage('getAuctions', this.auctionsPull));
}
socketFrontController.prototype.getAuctionStatus = function(client, data){

}
socketFrontController.prototype.getCurrentAuction = function(client, data){
    var curr = this.auctionsPull[this.curAuction] || auctionModule.getCurrent();
    return client.socket.emit('serverMessage', this.createMessage('getCurrentAuction', curr));
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
    if (auc._uid != data.auction_id)
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
    return {
        action: action,
        data: params
    };
}

socketFrontController.prototype.productLoad = function(){
    //TODO::calculate offset limit
    var limit = this.limit;
    var keys = Object.keys(this.productsPull);
    if (keys.length)
    {
        limit = this.limit - keys.length;
    }
    limit = (limit <= 0) ? 1 : limit;
    productsModule.loadProducts(this.offset, limit);
}

socketFrontController.prototype.setProductList = function(event, products){
    //productsModule.createProduct(this.pro);
    //console.log(products.length);
    if (products && products.length > 0)
    {
        this.offset += products.length;
        for(var i = 0; i < products.length; i++)
        {
            this.productsPull[products[i]._id] = products[i];
        }
        this.setAuctionList(products);
    }
    else
    {
        this.offset = 0;
        setInterval(this.productLoad.bind(this),1000*loadProductSleepTime);
    }
}

socketFrontController.prototype.setAuctionList = function(products){
    for(var i in products)
    {
        if (products.hasOwnProperty(i))
        {
            var auc = auctionModule.createAuction(products[i], products[i].auctionPrice);
            this.auctionsPull[auc._uid] = auc;
        }
    }
    var keys = Object.keys(this.auctionsPull);
    if (typeof keys[0] !== 'undefined' && !auctionModule.getCurrent())
    {
        this.curAuction = this.auctionsPull[keys[0]]._uid;
        auctionModule.startAuction(this.curAuction);
    }
}

socketFrontController.prototype.sendNotifyThatAuctionFinished = function(event, data){
    this.sendToAll(this.createMessage('auctionFinished', data));
    sleep(3000);
    delete this.auctionsPull[data._uid];
    var keys = Object.keys(this.auctionsPull);
    if (typeof keys[0] !== 'undefined')
    {
        auctionModule.startAuction(this.auctionsPull[keys[0]]._uid);
    }
    delete this.productsPull[data.lot._id];
    var keys = Object.keys(this.productsPull);
    if (keys.length < this.limit)
    {
        this.productLoad();
    }
    if (data.winner && data.winner._id)
    {
        var updata = {
            _id: data.lot._id,
            countInWarehouse: data.lot.countInWarehouse - data.count
        };
        productsModule.updateProduct(updata,function(res)
        {
            console.log('Product updated');
        });
    }
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
    var mes = {error: 401};
    client.socket.emit('serverMessage', this.createMessage(action, mes));
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

module.exports = socketFrontController;