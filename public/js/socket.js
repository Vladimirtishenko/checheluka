import Helper from './helper.js';

class Sockets extends Helper {
	constructor() {
		super();
		this.socket = io();
		this.registeredCallback = {};
	
		this.socket.on('serverMessage',(mess) =>
		{

			console.log(mess);

			try{
				this.registeredCallback[mess.action](mess);
			} catch(e){
				console.log(e);
				console.log(e.stack);
			}

			/*try{
				this[mess.action](mess);
			} catch(e){
				console.log(e);
			}
			

			if (mess.action == 'autoryze' && mess.data)
			{
				this.socket.emit('getCurrentAuction', {});
			}

			if (mess.action == 'getCurrentAuction' && mess.data)
			{
				this.socket.emit('baseBuy', {auction_id: mess.data._uid});
			}*/
		});

	}

	setRegisteredCallback(action, callback){
		this.registeredCallback[action] = callback;
	}

	authorize(action, data, callback){

		this.setRegisteredCallback(action, callback);

		this.socket.emit(action, data);

	}

	getCurrentAuction(action, callback){


		this.setRegisteredCallback(action, callback);

		this.socket.emit('getCurrentAuction', {});

	}

	getAuctions(action, callback){

		this.setRegisteredCallback(action, callback);

		this.socket.emit('getAuctions', {});

	}

	auctionFinished(action, callback){
		this.setRegisteredCallback(action, callback);
	}

	actionStarted(action, callback){
		this.setRegisteredCallback(action, callback);
	}


}

export default Sockets;