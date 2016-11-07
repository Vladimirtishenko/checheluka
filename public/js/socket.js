import Helper from './helper.js';

class Sockets extends Helper {
	constructor() {
		super();
		this.socket = io();
		this.socket.emit('chat message', 'HEa');
		this.socket.on('serverMessage',function(mess)
		{
			console.log(mess);
			if (mess.action == 'autoryze' && mess.data)
			{
				this.socket.emit('baseBuy', {});
			}
		}.bind(this));

		this.socket.emit('getAuctions', 'HEa');
	}

	init(){

		//this.socket.emit('register_user', {uname: 'test_uname', email: 'test@emailtest', pass: "123"});
		
		this.socket.emit('login', {email: 'test@emailtest', pass: "123"});
		//this.socket.emit('baseBuy', {email: 'test@emailtest', pass: "123"});
	}

}

export default Sockets;