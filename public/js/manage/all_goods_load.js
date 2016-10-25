
import Helper from '../helper.js';

import ModalGoodsToAdd from './add_goods.js';

class AsyncLoadFromAnouterResourse extends Helper {
	constructor(templates, classie){
		super();
		if(!templates || typeof templates != "function") return;
		this.offsetStart = 0;
		this.offsetEnd = 20;
		this.templates = templates;
		this.classie = classie;
		this.viewElement = document.querySelector('.a-all-goods-table');
		this.downloadMore = document.querySelector('.a-button-download-more');
		this.listenerClass = null;
		this.tryXHR();
		this.handlerToLoadButton();
	}

	handlerToLoadButton(){
		this.flyEvent('add', ['click'], [this.downloadMore], [this.tryXHR.bind(this)]);
	}

	tryXHR(){
		const url = 'http://chechelyka.com/auc.php?start='+this.offsetStart+"&end="+this.offsetEnd;

		this.xhrRequest("GET", url, null, null, this.responseFromServerGoodsItems.bind(this), this)

	}

	responseFromServerGoodsItems(el){
		
		let tmp = "";
		for (var i of (JSON.parse(el)).goods) {
			tmp += this.templates(i.img, i.title, i.description, i.size, i.color);
		}

		this.viewElement.classList.add(this.classie);

		this.viewElement.insertAdjacentHTML('beforeend', tmp);

		if(!this.listenerClass){
			new ModalGoodsToAdd(this.viewElement);
			this.listenerClass = true;
		}


		this.offsetStart = parseInt((JSON.parse(el)).offset);
		this.offsetEnd = this.offsetStart + 20;
		
		
	}

}

export default AsyncLoadFromAnouterResourse;