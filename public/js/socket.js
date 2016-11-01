import Helper from './helper.js';

class Sockets extends Helper {
	constructor() {
		super();
		const socket = io(); 
		socket.emit('chat message', 'HEa');
		socket.on('serverMessage',function(data)
		{
			console.log(111);
			console.log(data)
		});

		socket.emit('getAuctions', 'HEa');
	}

	init(){
		
		
	}

}

export default Sockets;