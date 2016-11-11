/**
 * Created by maxim.bondarenko on 07/11/2016.
 */
var mongoose = require('../../../../lib/mongoose');
var schema = mongoose.Schema({
    uname: String,
    email: {type: String, unique: true},
    city: String,
    pass: String
}, { collection: 'users' });
// Model
module.exports = mongoose.model('users', schema);