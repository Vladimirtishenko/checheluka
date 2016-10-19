import Helper from './helper.js';

class Sockets extends Helper {
	constructor() {
		super();
		const socket = io(); 
		socket.emit('chat message', 'HELLO FROM CLIENT');
	}

	init(){
		
		
	}

}

export default Sockets;