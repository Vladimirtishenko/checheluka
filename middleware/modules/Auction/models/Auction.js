var parent = require('../../../core/model');
function Auction() {
    parent.apply(this, arguments);
    this.entityData = {
        lot: {},
        startTime: null,
        expiredTime: null,
        basePrice: 0,
        winner: {},
        status: 'new',
        history: []
    }
}
Auction.prototype = Object.create(parent.prototype);

module.exports = Auction;