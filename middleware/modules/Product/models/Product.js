var parent = require('../../../core/model');
function Product() {
    parent.apply(this, arguments);
    this.entityData = {
        _id: 0,
        price: 0,
        title: '',
        description: '',
        color: '',
        size: ''
    }
}
Product.prototype = Object.create(parent.prototype);

module.exports = Product;