var http = require("http");

module.exports.get = function(req, res, next) {
    http.get('http://chechelyka.com/auc.php', (response) => {
        response.on('data', (body) => {
            res.render('index', {
                title: "Hello Express",
                body: String(body)
            });
        });

    })

}
