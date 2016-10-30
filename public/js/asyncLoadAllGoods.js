import Helper from './helper.js';

class AsyncLoadAllGoods extends Helper {
	constructor(el) {
		super();
		if(!el) return;
		this.Number = 1;
		this.offset = 0;
		this.el = el;
		this.status = true;

		this.requestModule();

		this.flyEvent('add', ['scroll'], [window], this.initAsyncLoad.bind(this))
	}

	initAsyncLoad(){

		if((document.body.clientHeight - document.body.scrollTop) < 800 && this.status){
			this.requestModule();
			
		}
		
	}

	requestModule(){
		this.status = false;
		let url = '/allGoodsAuction?start='+ this.offset;
		this.xhrRequest('GET', url, null, null, this.generateGoods.bind(this), this)
	}

	generateGoods(obj){

		let object = (JSON.parse(obj)).goods,
			offset = (JSON.parse(obj)).offset,
			tmp = "";

		for (var i = 0; i < object.length; i++) {
			tmp += this.templates(object[i]);
			this.Number++;
		}
		


		this.el.insertAdjacentHTML('beforeend', tmp);
		this.offset = offset;
		this.status = true;

	}



	templates(goods){


		let template = '<div class="a-all-goods-table__item">' + 
						  '<img src="'+decodeURIComponent(goods.src)+'" alt=""/>' + 
						  '<div class="a-all-goods-table__description">' + 
						    '<p class="a-all-goods-table__description_number">№ '+this.Number+'</p>' + 
						    '<p class="a-all-goods-table__description_info">Шубка писец</p>' + 
						  '</div>' + 
						  '<div class="a-hidden-block">' + 
						    '<div class="a-hidden-block__img-outer">' + 
						    	'<img src="'+decodeURIComponent(goods.src)+'" alt="" class="a-image-to-zoom"/>' + 
						    '</div>' + 
						    '<div class="a-hidden-block__description">' + 
						      '<div class="a-hidden-block__description__outer">' + 
						      		'<span class="a-hidden-block__description-link"> ' + 
						      			'<i>Размер </i>' + 
						      			'<span>'+decodeURIComponent(goods.size)+'</span>' + 
						      		'</span>' + 
						      		'<span class="a-hidden-block__description-link"> ' + 
						      			'<i>Состав</i>' + 
						      			'<span>'+decodeURIComponent(goods.consistOf)+'</span>' + 
						      		'</span>' + 
						      		'<span class="a-hidden-block__description-link"> ' + 
						      			'<i>Цвет</i>' + 
						      			'<span>'+decodeURIComponent(goods.color)+'</span>' + 
						      		'</span>' + 
						      		'<span class="a-hidden-block__description-link"> ' + 
						      			'<i>Ткань</i>' + 
						      			'<span>'+(decodeURIComponent(goods.material)).replace(/,|;/g , '<br />')+'</span>' + 
						      		'</span>' + 
						      	'</div>' + 
						      '<p class="a-old-price">Розничная цена<span>3000 руб.</span></p>' + 
						      '<p class="a-new-price">Начальная ставка<span>1000 руб.</span></p>' + 
						   ' </div>' + 
						  '</div>' + 
						'</div>';


		return template;			 
	}


}

export default AsyncLoadAllGoods;