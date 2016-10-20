var path = require('path');

module.exports.get = function(req, res, next) {

	res.render(require.resolve('/home/vladimir/www/checheluka/views/manage/index_manage.jade'), {
        title: "Hello Express"
    });

}