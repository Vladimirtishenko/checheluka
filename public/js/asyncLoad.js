import Helper from './helper.js';
import Template from './template.js';

class AsyncLoad extends Helper {
	constructor(el) {
		super();
		if(!el) return;
		this.mainItem = el;
		this.goodsAfter = document.querySelector('.a-else-goods');

		console.log($app);

		$app.socket.getCurrentAuction('getCurrentAuction', this.getCurrentAuction.bind(this));
		$app.socket.getAuctions('getAuctions', this.getAuctions.bind(this));

	}


	getCurrentAuction(response){
		if(!response.data || !response.data.lot) return;

		let template = Template[response.action](response.data.lot, response.data.timer);

		this.mainItem.removeChild(this.mainItem.firstElementChild)
		this.mainItem.insertAdjacentHTML('beforeend' ,template);
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



		this.goodsAfter.removeChild(this.goodsAfter.firstElementChild)
		this.goodsAfter.insertAdjacentHTML('beforeend' ,template);
	}


}

export default AsyncLoad;