import Helper from './helper.js';

import Template from './template.js';

class Sockets extends Helper {
	constructor() {
		super();
		this.socket = io();
		this.mainItem = document.querySelector('.a-backgroung-general-goods');
		this.goodsAfter = document.querySelector('.a-else-goods');

	
		/*this.socket.on('serverMessage',(mess) =>
		{

			try{
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
			}
		});
		this.socket.emit('login', {email: 'test@emailtest', pass: "123"});*/

	}

	init(){
		//this.socket.emit('register_user', {uname: 'test_uname', email: 'test@emailtest', pass: "123"});
		
		//this.socket.emit('login', {email: 'test@emailtest', pass: "123"});
		//this.socket.emit('baseBuy', {email: 'test@emailtest', pass: "123"});
	}

	getCurrentAuction(response){

		if(!response.data && !response.data.lot) return;

		let template = Template[response.action](response.data.lot, response.data.timer);

		this.mainItem.removeChild(this.mainItem.firstElementChild)
		this.mainItem.insertAdjacentHTML('beforeend' ,template);

	}

	getAuctions(response){

		if(!response.data) return;

		

		if(Object.keys(response.data).length > 3){
			this.getCurrentAuction(response.data[1]);
			delete response.data[1];
		} 



		let template = '<div class="a-goods__item__reisizers">',
			i = 0,
			classArray = ['__with-triangle-left-medium', '__with-waves-rigth-high __to_left-no-margin', '__without-triangle-left-min'];

		for(let key in response.data){
			template += Template[response.action](response.data[key].lot, classArray[i++]);
		}

		template += '</div>';



		this.goodsAfter.removeChild(this.goodsAfter.firstElementChild)
		this.goodsAfter.insertAdjacentHTML('beforeend' ,template);

	}

	actionStarted(){

	}

	auctionFinished(){

	}

}

export default Sockets;