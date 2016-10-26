
import Helper from '../helper.js';

class AsyncLoadFromOwnResourse extends Helper {
	constructor(templates, mainblock, button){
		super();
		if(!templates || typeof templates != "function") return;
		this.offsetStart = 0;
		this.templates = templates;

		this.mainblockTmp = mainblock;
		this.downloadMoreTemplate = button;
		this.viewElement = document.querySelector('view');
		this.tryXHR();

		this.viewElement.insertAdjacentHTML('beforeend',this.mainblockTmp + this.downloadMoreTemplate);
		
		this.downloadMoreButton = document.querySelector('.a-button-download-more');
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
			tmp += this.templates(i._id, i.src, i.title, i.description, i.size, i.color, i.consistOf, i.material, i.countInWarehouse, i.priority );
		}

		this.viewElement.firstElementChild.insertAdjacentHTML('beforeend', tmp);


		this.offsetStart = parseInt((JSON.parse(el)).offset);
		
		
	}

}

export default AsyncLoadFromOwnResourse;

