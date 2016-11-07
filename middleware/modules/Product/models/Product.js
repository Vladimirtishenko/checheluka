var parent = require('../../../core/model');
var mongoose = require('../../../../lib/mongoose');
function Product() {
    parent.apply(this, arguments);
    //mongoose schema description
    var schema = mongoose.Schema({
        title:String,
        description: String,
        src: String,
        size: String,
        color: String,
        consistOf: String,
        material: String,
        countInWarehouse: {type: Number, default: 0},
        auctionPrice: {type: Number, default: 0},
        price: {type: Number, default: 0},
        priority: Boolean
    }, { collection: 'goods' });
    // Model
    this.dataProvider = mongoose.model('goods', schema);
    this.entityData = {
        _id: 0,
        title: '',
        description: '',
        src: '',
        size: '',
        color: '',
        consistOf: '',
        material: '',
        countInWarehouse: 0,
        auctionPrice: 0,
        price: 0,
        priority: false
    }
}
Product.prototype = Object.create(parent.prototype);
Product.prototype.getEntity = function(id, callback)
{
    this.dataProvider.findOne({_id: email}, function(err, product) {
        if(err) return callback(err);
        return callback(product);
    });
};

Product.prototype.getEntityCollection = function(ofsset, lim, callback)
{
    ofsset = ofsset || 0;
    var query = this.dataProvider.find().where('countInWarehouse').gt(0).skip(ofsset);
    if (lim && lim > 0)
    {
        query.limit(lim);
    }
    query.exec(function(err, productColl) {
        //TODO: create error handler with AppServerError;
        if(err) return callback(err);
        return callback(productColl);
    });
};

Product.prototype.saveToStorage = function(entity, action, calback)
{
    if (action == 'create')
    {
        delete  entity._id;
        this.dataProvider.create(entity, function(err, newProd) {
            if(err) return calback(err);
            return calback(newProd);
        });
        return;
    }
    if (action == 'update')
    {
        this.dataProvider.update({_id: entity._id},entity,function(err, prod) {
            if(err) return callback(err);
            return callback(prod);
        });
        return;
    }
    this.__throwError("Error 'saveToStorage' ","Action parameter incorrect", 1);
};
module.exports = Product;