var parent = require('../../core/module');
var userClass = require('./models/User');
var userClass = require('./models/User');
var passHash = require('./services/password');
var usertModel = new userClass();

function UsersModule() {
    parent.apply(this, arguments);
    this.events = [
        'userFounded',
        'userCreated',
        'userLogined',
        'autoryzeCompleted'
    ];
}

UsersModule.prototype = Object.create(parent.prototype);
UsersModule.prototype.constructor = UsersModule;

UsersModule.prototype.registerUser = function(userName, email, pass){
    var user = {
        uname: userName,
        email: email,
        pass: passHash.hash(pass)
    };
    var entity = usertModel.createEntity(user);
    usertModel.saveToStorage(entity, 'create', function(result)
    {
        this.dispatchEvent('userCreated', result);
    }.bind(this))
};



UsersModule.prototype.autoryze = function(email, pass){
    usertModel.getEntity(email, function(user)
    {
        if (!passHash.validate(user.pass, pass))
        {
            user = false;
        }
        this.dispatchEvent('autoryzeCompleted', user);
    }.bind(this));
};

UsersModule.prototype.getUser = function(id){
    return productModel.table;
};

module.exports = UsersModule;