var parent = require('../../core/module');
var productClass = require('./models/Product');
var productModel = new productClass();
var http = require('http');
function ProductModule() {
    parent.apply(this, arguments);
    this.events = ['productsLoaded','productCreated'];
}

ProductModule.prototype = Object.create(parent.prototype);
ProductModule.prototype.constructor = ProductModule;

//TODO:: add module for requests
ProductModule.prototype.loadProducts = function(uri){
    var options = {
        host: 'localhost',
        path: uri,
        port: '3090',
    };

    callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var data = JSON.parse(str);
            for(var i = 0; i < data.goods.length; i++)
            {
                this.createProduct(data.goods[i]);
            }
            this.dispatchEvent('productsLoaded', []);
        }.bind(this));
    }.bind(this)

    var req = http.request(options, callback);
    req.end();
};



ProductModule.prototype.createProduct = function(productData){
    var product = productModel.createEntity(productData);
    this.dispatchEvent('productCreated', product);
    return product;
};

ProductModule.prototype.getProducts = function(uid, offset, limit){
    return productModel.table;
};

module.exports = ProductModule;