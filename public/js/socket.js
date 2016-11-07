import Helper from './helper.js';

class Sockets extends Helper {
	constructor() {
		super();
		this.socket = io();

	
		this.socket.on('serverMessage',(mess) =>
		{

			console.log(mess);
			try{
				this[mess.action](mess);
			} catch(e){
				console.log(e);
			}
			
					
			/*console.log(mess);
			if (mess.action == 'autoryze' && mess.data)
			{
				//this.socket.emit('baseBuy', {});
			}*/
		});
		this.socket.emit('getCurrentAuction', {});
		this.socket.emit('getAuctions', {});

	}

	init(){
		//this.socket.emit('register_user', {uname: 'test_uname', email: 'test@emailtest', pass: "123"});
		
		//this.socket.emit('login', {email: 'test@emailtest', pass: "123"});
		//this.socket.emit('baseBuy', {email: 'test@emailtest', pass: "123"});
	}

	getCurrentAuction(mess){
		console.log(mess)
	}

	getAuctions(mess){
		console.log(mess)

	}

	actionStarted(){

	}

	auctionFinished(){

	}

}

export default Sockets;