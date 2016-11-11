var parent = require('../../core/module');
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
    var userData = {
        uname: userName,
        email: email,
        pass: passHash.hash(pass)
    };
    var entity = usertModel.createEntity(userData);
    usertModel.saveToStorage(entity, 'create', function(user)
    {
        if (user && user.pass)
        {
            delete user.pass;
        }
        this.dispatchEvent('userCreated', user);
    }.bind(this))
};


UsersModule.prototype.autoryze = function(email, pass){
    usertModel.getEntity(email, function(user)
    {
        if (!user || !passHash.validate(user.pass, pass))
        {
            user = false;
        }
        else {
            delete user.pass;
        }
        this.dispatchEvent('autoryzeCompleted', user);
    }.bind(this));
};

module.exports = UsersModule;