module.exports = function(req, res, next, user){
	if(req.session && req.session.user.role == 'admin'){
		next();
	} else {
		res.render('login', {
			user: user
		});
	}
}