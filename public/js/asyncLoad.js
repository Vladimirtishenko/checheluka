import Helper from './helper.js';
import Template from './template.js';

class AsyncLoad extends Helper {
	constructor(el) {
		super();
		if(!el) return;
		this.mainItem = el;
		this.goodsAfter = document.querySelector('.a-else-goods');
		this.buyAction = true;

		this.init();
	}

	init(){
		$app.socket.getCurrentAuction('getCurrentAuction', this.getCurrentAuction.bind(this));
		$app.socket.getAuctions('getAuctions', this.getAuctions.bind(this));
		$app.socket.auctionFinished('auctionFinished', this.auctionFinished.bind(this));
		$app.socket.actionStarted('actionStarted', this.actionStarted.bind(this));
	}


	getCurrentAuction(response){

		if(!response.data || !response.data.lot) return;

		this.itemCount = response.data.count;
		this.pretendents = (Object.keys(response.data.history).length > 1 && Object.keys(response.data.pretendents).length <= 10) ? true : false;

		let template = Template['getCurrentAuction'](response.data.lot, response.data.timer, this.pretendents);

		this.mainItem.innerHTML = "";
		this.mainItem.insertAdjacentHTML('beforeend' ,template);

		this.timerStarted(response.data.timer);


		this.buttonToBuy = document.querySelector('.a-general-goods__description_buy');


		this.flyEvent('add', ['click'], [this.buttonToBuy], this.baseBuyInitial.bind(this));

	}


	getAuctions(response){

		if(!response.data) return;
		var keys = Object.keys(response.data);
		if(keys.length > 3){
			this.getCurrentAuction(response.data[keys[0]]);
			delete response.data[keys[0]];
		} 

		let template = '<div class="a-goods__item__reisizers">',
			i = 0,
			classArray = ['__with-triangle-left-medium', '__with-waves-rigth-high __to_left-no-margin', '__without-triangle-left-min'];

		for(let key in response.data){
			template += Template[response.action](response.data[key].lot, classArray[i++]);
		}

		template += '</div>';

		this.goodsAfter.innerHTML = "";
		this.goodsAfter.insertAdjacentHTML('beforeend' ,template);

	}

	timerStarted(time){
		let timer = document.querySelector('.a-times-frontend');

		this.globalTimer = setTimeout(() => {
			timer.innerHTML = "00:"+ ((time < 10) ? '0'+time : time);
			
			if(time < 1) {
				this.clearTimerAndRequest(); 
				return;
			}

			time--;
			this.timerStarted(time);
		}, 1000)

	}

	clearTimerAndRequest(){
		clearTimeout(this.globalTimer);
	}


	auctionFinished(response){
		this.buyAction = true;
		this.buttonToBuy.classList.remove('a-inactive');
	}


	actionStarted(response){
		this.getCurrentAuction(response);
	}

	baseBuyInitial(event){

		let count = document.querySelector('.a-type-to-count');

		if(event && event.target && this.buyAction && count && this.auctionValidate(count)){
			this.buyAction = false;
			this.buttonToBuy.classList.add('a-inactive');
			$app.socket.baseBuy('baseBuy', {count: count.value}, this.baseBuy.bind(this));
		}

	}

	baseBuy(response){
		if(response && response.data && response.data.error == 401){
			$app.modalOpen({target: document.querySelector('.__login_action')});
		}
	}

	auctionValidate(count){
		if(!isNaN(count.value) && count.value < 0 || count.value > this.itemCount){
			let elToError = document.querySelector('.a-general-goods__time_to_end');
			elToError.innerHTML += '<p>Колличесво на складе '+this.itemCount+'. Вы не можете купить больше!</p>';
		}
	}


}

export default AsyncLoad;