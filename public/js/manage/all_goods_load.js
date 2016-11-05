
import Helper from '../helper.js';

import ModalGoodsToAdd from './add_or_delete_action.js';

class AsyncLoadFromAnouterResourse extends Helper {
	constructor(templates, mainblock, url){
		super();
		if(!templates || typeof templates != "function") return;
		this.offsetStart = 0;
		this.offsetEnd = 20;
		this.templates = templates;
		this.mainblockTmp = mainblock;
		this.url = url;
		this.viewElement = document.querySelector('view');
		this.searchButton = document.getElementById('a-search-admin');
		this.status = true;
		this.viewElement.insertAdjacentHTML('beforeend',this.mainblockTmp);

		
		if(globalRegistredModules['scrollHandlers']){
			this.flyEvent('remove', ['scroll'], [window], globalRegistredModules['scrollHandlers']);
		}

		globalRegistredModules['scrollHandlers'] = this.handlerScroll.bind(this);


		this.flyEvent('add', ['scroll'], [window], globalRegistredModules['scrollHandlers'])
		this.flyEvent('add', ['keyup'], [this.searchButton], this.handlerToSearch.bind(this))
		this.tryXHR();

	}

	handlerScroll(){
		if((document.body.clientHeight - document.body.scrollTop) < 1000 && this.status){
			this.tryXHR();
		}
	}


	tryXHR(urls, clear){
		this.status = false;
		let search = urls || '';
		let url = this.url+"?start="+this.offsetStart+"&end="+this.offsetEnd+search;

		this.xhrRequest("GET", url, null, null, this.responseFromServerGoodsItems.bind(this, clear), this)

	}

	handlerToSearch(){
		if(event && event.keyCode == 13){
			this.offsetStart = 0;
			this.offsetEnd = 5;
			this.tryXHR('&searhByTitle='+encodeURIComponent(event.target.value), 'clear');
		}
	}


	responseFromServerGoodsItems(clear, el){

		let tmp = "",
			obj = (JSON.parse(el)).goods || null;

		if(!obj || obj.length == 0){
			this.flyEvent('remove', ['scroll'], [window], globalRegistredModules['scrollHandlers']);
			return;
		}

		console.log(obj);

		for (var i of obj) {
			tmp += this.templates(
					i.id,
					i.img || i.src, 
					i.title, 
					i.description,
					i.size, 
					i.color, 
					i.Material || i.material, 
					i.Sostav || i.consistOf,
					i.count,
					i.priority,
					i.PriceRoz || i.price,
					i.auctionPrice
					);
		}

		if(clear){
			this.viewElement.firstElementChild.innerHTML = "";
		}

		this.viewElement.firstElementChild.insertAdjacentHTML('beforeend', tmp);

		if(!globalRegistredModules['ModalGoodsToAdd']){
			new ModalGoodsToAdd(this.viewElement);
			globalRegistredModules['ModalGoodsToAdd'] = true;

		}
		

		this.offsetStart = parseInt((JSON.parse(el)).offset);
		this.offsetEnd = this.offsetStart + 20;
		this.status = true;
		
	}

}

export default AsyncLoadFromAnouterResourse;