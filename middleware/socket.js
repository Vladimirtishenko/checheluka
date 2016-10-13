function Socket(socket){

	console.log('USER online');

socket.on('chat message', this.getTheMessage)
socket.on('disconnect', this.disconnect);


}


Socket.prototype.getTheMessage = function(msg){

	console.log(msg);

	//io.emit('chat message', msg); // send all users

}

Socket.prototype.disconnect = function(){


	console.log('disconnect');

}



module.exports = Socket;