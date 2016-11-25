import Helper from './helper.js';
import Template from './template.js';
import Bucket from './bucket.js';

class AsyncLoad extends Helper {
	constructor(el) {
		super();
		if(!el) return;
		this.mainItem = el;
		this.goodsAfter = document.querySelector('.a-else-goods');
		//this.buyAction = true;
		this.init();
	}

	init(){
		$app.socket.getCurrentAuction('getCurrentAuction', this.getCurrentAuction.bind(this));
		$app.socket.getAuctions('getAuctions', this.getAuctions.bind(this));
		$app.socket.auctionFinished('auctionFinished', this.auctionFinished.bind(this));
		$app.socket.actionStarted('actionStarted', this.actionStarted.bind(this));
		$app.socket.auctionUpdated('auctionUpdated', this.auctionUpdated.bind(this));
	}


	getCurrentAuction(response){

		if(!response.data || !response.data.lot) return;

		this.itemCount = response.data.count;
		this.auctionId = response.data._uid;
		this.currentPrice = response.data.currentPrice;
		this.previousPrice = response.data.price;
		//this.butonsDefferent = ($app.local.gets('id') == this.auctionId) && (this.currentPrice == $app.local.gets('price')) ? true : false;

		/*if(this.butonsDefferent){
			this.buyAction = false;
		}*/

		this.pretendentsAuction = response.data.pretendents;
		this.pretendents = Object.keys(response.data.pretendents).length <= 10 ? true : false;


		if(response.data.status != 'started'){
			$app.chat.clear();
		} else {
			$app.chat.clearTemplate(this.auctionId);
			$app.chat.add(this.pretendentsAuction, this.previousPrice);
		}


		let template = Template['getCurrentAuction'](this.auctionId, response.data.lot, this.currentPrice, response.data.timer, this.pretendents, this.itemCount, this.butonsDefferent);

		this.mainItem.innerHTML = "";
		this.mainItem.insertAdjacentHTML('beforeend' ,template);

		try{
			clearTimeout(this.globalTimer);
		} catch(e){}
		this.timerStarted(response.data.timer);


		this.buttonToBuy = document.querySelector('.a-general-goods__description_buy');
		this.buttonToBuyUpPrice = document.querySelector('.a-general-goods__description_rates_button');
		this.priceNow = document.querySelector('.a-general-goods__description_price_now_upgraded');
		this.countNow = document.querySelector('.a-type-to-count');
		this.notification = document.querySelector('.a-add-rate');

		this.flyEvent('add', ['click'], [this.buttonToBuy, this.buttonToBuyUpPrice], [this.baseBuyInitial.bind(this), this.baseBuyInitialToUpPrice.bind(this)]);


	}


	getAuctions(response){

		if(!response.data || Object.keys(response.data).length == 0) return;
	 	
		this.goodsAfter.innerHTML = "";

		console.log(response);

		let template = '<div class="a-goods__item__reisizers">',
			i = 0,
			classArray = ['__with-triangle-left-medium', '__with-waves-rigth-high __to_left-no-margin', '__without-triangle-left-min'];

		for(let key in response.data){
			template += Template[response.action](response.data[key]._uid, response.data[key].lot, classArray[i++]);
		}

		template += '</div>';
		
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
		//this.buyAction = true;
		//this.buttonToBuy.classList.remove('a-inactive');
		Bucket.getBucket();
		$app.chat.addWinner(response.data.winner, response.data.price);
	}

	auctionUpdated(response){

		console.log(response);

		if(response && response.data){

			this.priceNow.innerHTML = response.data.currentPrice;
			this.countNow.value = response.data.count;
			this.currentPrice = response.data.currentPrice;
			this.pretendentsAuction = response.data.pretendents;
			this.notification.innerHTML = "";
			this.auctionEnabled();

			$app.chat.add(this.pretendentsAuction, response.data.price);

			try{
				clearTimeout(this.globalTimer);
			} catch(e){}
			this.timerStarted(response.data.timer);

		}
		
		
	}

	actionStarted(response){
		this.getCurrentAuction(response);
	}

	baseBuyInitial(event){

		event.stopPropagation();

		let countAttr = document.querySelector('.a-type-to-count').value,
			count = isNaN(parseInt(countAttr)) ? 1 : parseInt(countAttr);

		if(!event || !event.target) return;

		console.log(this);


		this.auctionDisabled();
		//$app.local.sets(['id', 'price'], [this.auctionId, this.currentPrice]);

		if(count > this.itemCount){
			$app.socket.upCount('upCount', {auction_id: this.auctionId, count: count}, this.upCount.bind(this));
		} else {
			$app.socket.baseBuy('baseBuy', {auction_id: this.auctionId}, this.baseBuy.bind(this));
		}

	}

	baseBuyInitialToUpPrice(event){

		event.stopPropagation();

		let target = event && event.target || null;

		if((!target.matches('button') && !this.pretendents)) return;

		this.auctionDisabled();

		let buttonPriceArray = target.innerText.match(/\d+/);

		if(buttonPriceArray instanceof Array && parseInt(buttonPriceArray[0]) > 50 && parseInt(buttonPriceArray[0]) < 502) {
			$app.socket.upPrice('upPrice', {auction_id: this.auctionId, price: parseInt(buttonPriceArray[0])}, this.upPrice.bind(this));
		}

	}

	auctionDisabled(){
		/*this.buyAction = false;
		this.buttonToBuy.classList.add('a-inactive');
		this.buttonToBuyUpPrice.classList.add('a-rates-inactive');*/
		this.notification.innerHTML = "Ставка сделана! Oждидайте завершения торгов!";
	}

	auctionEnabled(){
		/*$app.local.remove(['id', 'price']);
		this.buyAction = true;*/
		this.notification.innerHTML = "";
		//this.buttonToBuy.classList.remove('a-inactive');
		//this.buttonToBuyUpPrice.classList.remove('a-rates-inactive');
	}

	upPrice(response){
		console.log(response);
		if(!this.tryAuthoryze(response)){
			this.auctionEnabled();
		}

	}

	upCount(response){
		console.log(response);
		if(!this.tryAuthoryze(response)){
			this.auctionEnabled();
		}
	}


	baseBuy(response){
		console.log(response);
		if(!this.tryAuthoryze(response)){
			this.auctionEnabled();
		}
		
	}

	tryAuthoryze(response){
		if(response && response.error && response.error.errorCode == 401){
			$app.modalOpen({target: document.querySelector('.__login_action')});
			return false;
		}
		return true;
	}

	auctionValidate(count){
		if(!isNaN(count.value) && count.value < 0 || count.value > this.itemCount){
			let elToError = document.querySelector('.a-general-goods__time_to_end');
			elToError.innerHTML += '<p>Колличесво на складе '+this.itemCount+'. Вы не можете купить больше!</p>';
			return false;
		}

		return true;

	}


}

export default AsyncLoad;