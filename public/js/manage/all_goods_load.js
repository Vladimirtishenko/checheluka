
import Helper from '../helper.js';

import ModalGoodsToAdd from './add_or_delete_action.js';

class AsyncLoadFromAnouterResourse extends Helper {
	constructor(templates, mainblock, button){
		super();
		if(!templates || typeof templates != "function") return;
		this.offsetStart = 0;
		this.offsetEnd = 20;
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
		this.flyEvent('add', ['click'], [this.downloadMoreButton], [this.tryXHR.bind(this)]);
	}

	tryXHR(){
		const url = 'http://chechelyka.com/auc.php?start='+this.offsetStart+"&end="+this.offsetEnd;

		this.xhrRequest("GET", url, null, null, this.responseFromServerGoodsItems.bind(this), this)

	}

	responseFromServerGoodsItems(el){

		let tmp = "";
		for (var i of (JSON.parse(el)).goods) {
			tmp += this.templates(i.img, i.title, i.description, i.size, i.color, i.Material, i.Sostav);
		}


		this.viewElement.firstElementChild.insertAdjacentHTML('beforeend', tmp);

		if(!globalRegistredModules['ModalGoodsToAdd']){
			new ModalGoodsToAdd(this.viewElement);
			globalRegistredModules['ModalGoodsToAdd'] = true;

		}
		

		this.offsetStart = parseInt((JSON.parse(el)).offset);
		this.offsetEnd = this.offsetStart + 20;
		
		
	}

}

export default AsyncLoadFromAnouterResourse;