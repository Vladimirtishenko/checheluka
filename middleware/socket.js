var config = require('./config/http');
var io = require('socket.io').listen(config.port);
var ctrl = require('./socketFrontController');
new ctrl(io);