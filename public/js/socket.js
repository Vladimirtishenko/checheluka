import Helper from './helper.js';
let io = require('socket.io-client');

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
			} catch(e){}
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

	auctionUpdated(action, callback){
		this.setRegisteredCallback(action, callback);
	}

	baseBuy(action, data, callback){
		this.setRegisteredCallback(action, callback);

		this.socket.emit(action, data);
	}

	upPrice(action, data, callback){
		console.log(arguments);
		this.setRegisteredCallback(action, callback);

		this.socket.emit(action, data);
	}

	upCount(action, data, callback){
		this.setRegisteredCallback(action, callback);

		this.socket.emit(action, data);
	}


}

export default Sockets;