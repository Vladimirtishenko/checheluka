import Helper from './helper.js';
import Template from './template.js';

class AsyncLoad extends Helper {
	constructor(el) {
		super();
		this.mainItem = document.querySelector('.a-backgroung-general-goods');
		this.goodsAfter = document.querySelector('.a-else-goods');


		$app.socket.getCurrentAuction('getCurrentAuction', this.getCurrentAuction.bind(this));
		$app.socket.getCurrentAuction('getAuctions', this.getAuctions.bind(this));

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


}

export default AsyncLoad;