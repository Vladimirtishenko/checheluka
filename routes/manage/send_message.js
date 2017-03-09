var mail = require('../../middleware/mail_sender.js');

module.exports.post = function(req, res, next) {

	mail(req, function(err, message){
		if(err){
			res.json({
				status: 500,
				errorMsg: 'Сообщение не отправлено, внутренняя ошибка транспорта писем!'
			})
			res.end();
		}

		res.json({
			status: 200,
			successMsg: 'Сообщение отправлено!'
		})
	});


}
