import Helper from './helper.js';

class Sockets extends Helper {
	constructor() {
		super();
		this.socket = io();
		this.registeredCallback = {};
	
		this.socket.on('serverMessage',(mess) =>
		{
			console.log(mess);
			/*if (mess.action == 'login' && mess.data)
			{
				this.socket.emit('upPrice', {auction_id:1, price: 2222});
			}

			if (mess.action == 'upPrice')
			{
				this.socket.emit('upCount', {auction_id:1, count: 2});
			}*/
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

	baseBuy(action, data, callback){
		this.setRegisteredCallback(action, callback);

		this.socket.emit(action);
	}

	upPrice(action, data, callback){
		this.setRegisteredCallback(action, callback);

		this.socket.emit(action, data);
	}

	upCount(action, data, callback){
		this.setRegisteredCallback(action, callback);

		this.socket.emit(action, data);
	}


}

export default Sockets;