import Helper from '../helper.js';

import Templates from './templates.js';


class Router extends Helper {
	constructor(routs){
		super();	
		this.defineRouts();
	}

	defineRouts (){
		const self = this,
			  menu = document.querySelector('.a-menu-admin__links');

		this.routs = {
			allGoods: self.changeRouts.bind(self, 'allGoods'),
			allGoodsAuction: self.changeRouts.bind(self, 'allGoodsAuction'),
			orders: self.changeRouts.bind(self, 'orders')
		}

		this.routs['allGoods']();

		menu.addEventListener('click', this.handlerToClick.bind(this));
		
	}

	handlerToClick(event){

		let attr = event && event.target && event.target.href;

		if(!attr) return;

		let url = (attr.indexOf('#') != -1) ? attr.substr(attr.indexOf('#') + 1) : null;

		if(this.activeRouts == url || !url) return;

		this.routs[url]();

		this.activeRouts = url;

	}

	changeRouts(url){

		this.activeRouts = url;

		let template = new Templates();

		template[url]();

	}



}

export default Router;