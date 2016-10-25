
import Helper from '../helper.js';

class AsyncLoadFromOwnResourse extends Helper {
	constructor(templates, classie){
		super();
		if(!templates || typeof templates != "function") return;
		this.offsetStart = 0;
		this.templates = templates;
		this.classie = classie;
		this.viewElement = document.querySelector('.a-all-goods-table');
		this.downloadMore = document.querySelector('.a-button-download-more');
		this.tryXHR();
		this.handlerToLoadButton();
	}

	handlerToLoadButton(){
		this.flyEvent('add', ['click'], [this.downloadMore], [this.tryXHR.bind(this)]);
	}

	tryXHR(){
		const url = '/allGoodsAuction?start='+this.offsetStart;

		this.xhrRequest("GET", url, null, null, this.responseFromServerGoodsItems.bind(this), this)

	}

	responseFromServerGoodsItems(el){
		

		let tmp = "";
		for (var i of (JSON.parse(el)).goods) {
			tmp += this.templates(i._id, i.src, i.title, i.description, i.size, i.color);
		}

		this.viewElement.classList.add(this.classie);

		this.viewElement.insertAdjacentHTML('beforeend', tmp);


		this.offsetStart = parseInt((JSON.parse(el)).offset);
		
		
	}

}

export default AsyncLoadFromOwnResourse;

