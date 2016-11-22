var Users = require('../middleware/modules/Users/models/SchemaModel'),
    moduleUser = require('../middleware/modules/Users/UsersModule'),
    CheckAuth = require("../middleware/authorize.js");


module.exports.get = function(req, res, next) {
  CheckAuth(req, res, next);
}

module.exports.post = function(req, res, next) {

  var user =  new moduleUser();

  user.autoryze(req.body.email, req.body.pass, function(user){
    if(user && user.role == "admin"){
      res.redirect('/page_auction');
    } else {
      CheckAuth(req, res, next, 'Такого пользователя нет либо не верный пароль!');
    }
  })

}

module.exports.delete = function(req, res, next) {
    
   if(!req.body.id) next();

   Users.remove({_id: req.body.id}, function(err, user){
        if(!user){
           res.json({status: 401}) 
        } else {
           res.json({user: user}) 
        }
   })

}

module.exports.put = function(req, res, next) {


    var user =  new moduleUser();
        userData = {
            email: req.body.email,
            pass: req.body.pass,
            city: req.body.city || 'Белгород',
            role: req.body.role || 'customer'
        };

    user.registerUser(userData.email, userData.pass, userData.city, userData.role, function(user){
        if(!user){
           res.json({status: 401}) 
        } else {
           res.json({user: user}) 
        }
    });


}