var aucMod = require('./modules/Auction/AuctionModule');
var prodModule = require('./modules/Product/ProductModule');
var usersClass = require('./modules/Users/UsersModule');
var orderClass = require('./modules/Orders/OrdersModule');
var auctionModule = new aucMod();
var productsModule = new prodModule();
var usersModule = new usersClass();
var ordersModule = new orderClass();
var configOptions = require('./services/configOptions');
var socketClient = require('./services/socketClient');
var loadProductSleepTime = 2; // if product did not loaded server slepp for $ sec

function socketFrontController(io){
    this.io = io;
    //set starting data
    this.limit = 4;
    this.offset = 0;
    this.productsPull = {};
    this.auctionsPull = {};
    this.curAuction = null;
    this.lastAuction = null;
    this.isTimerForLoadSet = false;
    productsModule.setListenere("productsLoaded",this.setProductList.bind(this));
    auctionModule.setListenere("finishAuction",this.sendNotifyThatAuctionFinished.bind(this));
    auctionModule.setListenere("auctionUpdated",this.notifyAuctionUpdated.bind(this));
    auctionModule.setListenere("startAuction",this.notifyAuctionStarted.bind(this));
    auctionModule.setListenere("pretendentAdded",this.notifyPretendentAdded.bind(this));
    //initialyze client connection
    io.on('connection', function(socket){
        var newClient = new socketClient(socket);
        newClient.setErrorHandler(this.onError.bind(this));
        newClient.setEvent('login', this.login.bind(this));
        newClient.setEvent('register_user', this.register_user.bind(this));
        newClient.setEvent('baseBuy', this.baseBuy.bind(this));
        newClient.setEvent('getCurrentAuction', this.getCurrentAuction.bind(this));
        newClient.setEvent('getAuctions', this.getAuctions.bind(this));
        newClient.setEvent('upCount', this.upCount.bind(this));
        newClient.setEvent('upPrice', this.upPrice.bind(this));
    }.bind(this));
    io.on('error', function(err) {
        //here i change options
        console.log(err);
    });
    this.productLoad();
}

socketFrontController.prototype.initStart = function(){
    var self = this;

    configOptions.getOption('date', function(err, conf){
        console.log('get options');
        console.log(err, conf);
        if (conf && conf.params)
        {
            var d = new Date();
            var timeInt = d.getTime();
            if (conf.params <= timeInt && self.curAuction){
                configOptions.updateOption('date', null, function(err, data){
                    if (!err && data)
                    {
                        this.lastAuction = null;
                        auctionModule.startAuction(self.curAuction);
                    }
                });
                return;
            }
            else{
                var keys = Object.keys(self.productsPull);
                if (keys.length < this.limit && self.isTimerForLoadSet === false)
                {
                    self.isTimerForLoadSet = setTimeout(self.productLoad.bind(self),1000*30);
                }
            }
        }
        else{
            if ((self.curAuction == self.lastAuction))
            {
                var now = new Date();
                now.setDate(now.getDate()+14);
                configOptions.updateOption('date', now.getTime(), function(err, res){
                    if (!err)
                    {
                        this.sendToAll(this.createMessage('AuctionFinishedDataChanged', {"nextStartTime" : now.getTime()}));
                    }
                }.bind(self));
            }
            auctionModule.startAuction(self.curAuction);
        }
    });
}

socketFrontController.prototype.login = function(client, data){
    if (client.isAutorize())
    {       
        client.socket.emit('serverMessage', this.createMessage('login', client.getUserData()));
    }
    //set listner for completed autorization
    usersModule.setListenere("autoryzeCompleted",function(event, data){
        var err;
        if (!data)
        {
            err = this.createError(401,"not autorize");
        }
        else{
            client.setUserData(data);
        }
        client.socket.emit('serverMessage', this.createMessage('login', data, err));
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
    usersModule.registerUser(data.email, data.pass, data.city);
}

socketFrontController.prototype.getAuctionsAll = function(client, data){
    //client.socket.emit('serverMessage', this.createMessage('getAuctions', this.auctionsPull));
}

socketFrontController.prototype.getAuctions = function(client, data){
    var auctions = JSON.parse(JSON.stringify(this.auctionsPull));
    delete auctions[this.curAuction];
    client.socket.emit('serverMessage', this.createMessage('getAuctions', auctions));
}

socketFrontController.prototype.getCurrentAuction = function(client, data){
    var curr = this.auctionsPull[this.curAuction] || auctionModule.getCurrent();
    return client.socket.emit('serverMessage', this.createMessage('getCurrentAuction', curr));
}
socketFrontController.prototype.baseBuy = function(client, data){
    var action = 'baseBuy';
    if (!client.isAutorize())
    {
        return this.sendNotAutorize(client, action);
    }
    var err;
    var auc = auctionModule.getCurrent();
    var response = {result: 'success', id: auc._uid, price: auc.currentPrice};
    if (auc._uid != data.auction_id)
    {
        response = null;
        err = this.createError(404, 'Auction with auction_id = '+data.auction_id+' not found');
    }
    else if (!auctionModule.setPretendent(auc._uid, client.getUserData()))
    {
        response = null;
        err = this.createError(403, 'You are already pretendent for this lot');
    }
    client.socket.emit('serverMessage', this.createMessage(action, response, err));
};

socketFrontController.prototype.upCount = function(client, data){
    var action = 'upCount';
    if (!client.isAutorize())
    {
        return this.sendNotAutorize(client, action);
    }
    var response = true;
    var err;
    var auc = auctionModule.getCurrent();
    if (auc._uid != data.auction_id)
    {
        response = null;
        err = this.createError(404, 'Auction with auction_id = '+data.auction_id+' not found');
    }
    else if (!data.count)
    {
        response = null;
        err = this.createError(400, 'Incorrect "count" parameter');
    }
    else if (this.productsPull[auc.lot._id].countInWarehouse < data.count
        || !auctionModule.setCount(auc._uid, data.count, client.getUserData()))
    {
        response = null;
        err = this.createError(400, 'Incorrect request');
    }
    client.socket.emit('serverMessage', this.createMessage(action, response, err));
};


socketFrontController.prototype.upPrice = function(client, data){
    var action = 'upPrice';
    if (!client.isAutorize())
    {
        return this.sendNotAutorize(client, action);
    }
    var response = true;
    var err;
    var auc = auctionModule.getCurrent();
    if (auc._uid != data.auction_id)
    {
        response = null;
        err = this.createError(404, 'Auction with auction_id = '+data.auction_id+' not found');
    }
    else if (!data.price)
    {
        response = null;
        err = this.createError(400, 'Incorrect "count" parameter');
    }
    else if (!auctionModule.setPrice(auc._uid, data.price, client.getUserData()))
    {
        response = null;
        err = this.createError(400, 'Incorrect request');
    }
    client.socket.emit('serverMessage', this.createMessage(action, response, err));
};

socketFrontController.prototype.createMessage = function(action, params, errorMess){
    var mess = {
        action: action,
        data: params
    };
    if (errorMess)
    {
        mess.error = errorMess;
    }
    return mess;
};

socketFrontController.prototype.createError = function(code, message){
    return {errorCode: code, errorMessage: message};
};

socketFrontController.prototype.productLoad = function(){
    console.log('product load');
    var keys = Object.keys(this.productsPull);
    var keysAuc = Object.keys(this.auctionsPull);
    if (keysAuc.length >= this.limit )
    {
        return;
    }
    var limit = this.limit;
    if (keysAuc.length)
    {
        limit = this.limit - keysAuc.length;
    }
    limit = (limit <= 0) ? 1 : limit;
    productsModule.loadProducts(this.offset, limit);
}

socketFrontController.prototype.setProductList = function(event, products){
    //productsModule.createProduct(this.pro);
    if (products && products.length > 0)
    {
        var newProducts = [];

        for(var i = 0; i < products.length; i++)
        {
            if (!this.productsPull[products[i]._id])
            {
                this.productsPull[products[i]._id] = products[i];
                newProducts.push(products[i]);
            }
        }
        this.isTimerForLoadSet = false;
        this.offset += newProducts.length;
        this.setAuctionList(newProducts);
    }
    else
    {
        this.offset = 0;
        var aucKeys = Object.keys(this.auctionsPull);
        this.lastAuction = aucKeys[aucKeys.length - 1];
        this.isTimerForLoadSet = setTimeout(this.productLoad.bind(this),1000*loadProductSleepTime);
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
        this.initStart();
    }
    var auctions = JSON.parse(JSON.stringify(this.auctionsPull));
    delete auctions[this.curAuction];
    this.sendToAll(this.createMessage('getAuctions', auctions));
}

socketFrontController.prototype.sendNotifyThatAuctionFinished = function(event, data){
    this.sendToAll(this.createMessage('auctionFinished', data));
    productsModule.setListenere("productUpdated",function(event, product)
    {
        var keys = Object.keys(this.productsPull);
        if (keys.length < this.limit && this.isTimerForLoadSet === false)
        {
            this.productLoad();
        }
    }.bind(this));
    var auction = this.auctionsPull[data._uid];
    var countIwWarehouse = auction.lot.countInWarehouse - auction.count;
    if (data.winner && Object.keys(data.winner).length > 0)
    {
        var winKeys = Object.keys(data.winner);
        var prod = this.productsPull[data.lot._id];
        prod = JSON.parse(JSON.stringify(prod));
        auction.lot.countInWarehouse = data.lot.countInWarehouse - (data.count * winKeys.length);
        var updata = {
            _id: data.lot._id,
            countInWarehouse: auction.lot.countInWarehouse
        };
        productsModule.setListenere("productUpdated",function(event, product)
        {
            if (product && product._id != data.lot._id)
            {
                return;
            }
            console.log('Product updated');
            for (var i = 0; i < winKeys.length; i++)
            {
                ordersModule.createOrder(
                    data.winner[winKeys[i]]._id,
                    data._id,
                    prod,
                    data.count,
                    data.price
                );
            }
        });
        productsModule.updateProduct(updata);
    }

    if (countIwWarehouse >= 0)
    {
        if (!data.winner || Object.keys(data.winner).length == 0)
        {
            auction.lot.countInWarehouse = countIwWarehouse;
            var updata = {
                _id: data.lot._id,
                countInWarehouse: auction.lot.countInWarehouse,
                unsoldCount: auction.lot.unsoldCount + auction.count
            };
            productsModule.updateProduct(updata);
        }
        if (countIwWarehouse > 0)
        {
            sleep(3000);
            return this.initStart();
        }
    }
    delete this.productsPull[data.lot._id];
    delete this.auctionsPull[data._uid];
    auctionModule.removeAuctionFrom(data._uid);
    //wait 3 sec besore start new auction
    sleep(3000);

    var keys = Object.keys(this.auctionsPull);
    if (typeof keys[0] !== 'undefined')
    {
        this.curAuction = this.auctionsPull[keys[0]]._uid;
        this.initStart();
    }
    else
    {
        this.curAuction = null;
        this.initStart();
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
    var mes = this.createError(401, "not autorize");
    client.socket.emit('serverMessage', this.createMessage(action, null, mes));
}
socketFrontController.prototype.notifyPretendentAdded = function(event, data)
{
    this.sendToAll(this.createMessage('pretendentAdded', data));
}

socketFrontController.prototype.onError = function(client, action, errors){
    var mes = this.createError(500, "server error");
    client.socket.emit('serverMessage', this.createMessage(action, null, mes));
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