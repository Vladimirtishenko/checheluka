import Helper from './helper.js';

class AsyncLoad extends Helper {
	constructor(el) {
		super();
		if(!el) return;
		this.Number = 2;
		this.offset = 0;
		this.el = el;
		this.status = true;
		this.load = true;
		this.menthodToScroll = this.initAsyncLoad.bind(this)

		this.requestModule();
		this.flyEvent('add', ['scroll'], [window], this.menthodToScroll)
	}

	initAsyncLoad(){

		if((document.body.clientHeight - document.body.scrollTop) < 1000 && this.status && this.load){
			this.requestModule();
		}
		
	}

	requestModule(){
		this.status = false;
		let url = '/allGoodsAuction?start='+ this.offset+'&limit=3';
		this.xhrRequest('GET', url, null, null, this.generateGoods.bind(this), this)
	}

	generateGoods(obj){


		if(JSON.parse(obj).goods.length == 0){
			this.load = false;
			this.flyEvent('remove', ['scroll'], [window], this.menthodToScroll)
		}


		let response = JSON.parse(obj).goods,
			offset = JSON.parse(obj).offset,
			templateAll = '<div class="a-goods__item__reisizers">';

			for (var i = 0; i < response.length; i++) {

				templateAll += this.templates(response[i], i);
				this.Number++;

			}

			templateAll += '</div>';



		this.el.insertAdjacentHTML('beforeend', templateAll);
		this.offset = offset;
		this.status = true;

	}



	templates(goods, i){

		let classArray = ['__with-triangle-left-medium', '__with-waves-rigth-high __to_left-no-margin', '__without-triangle-left-min'],
			newClass = (i % 2 != 0) ? ' a-add-new-background' : ' ';

		let template = '<div class="a-else-goods__item '+classArray[i] + newClass + '" >' +
						'<div class="a-resizer-masonry">' +
							'<img src="'+decodeURIComponent(goods.src)+'" class="a-image-to-zoom"/>' +
						'</div>' +
						'<div class="a-else-goods__description">' +
						  '<p class="a-number-goods"> №' +
						    '<span>'+this.Number+'</span>' +
						  '</p>' +
						  '<p class="a-else-goods-descroption">Шапка писец</p>' +
						  '<div class="a-else-goods__description_info">' +
						  	'<span class="a-else-goods__description_info-link">'  +
						  		'<i>Состав<span>'+decodeURIComponent(goods.consistOf)+'</span></i>' +
						  	'</span>' +
						  	'<span class="a-else-goods__description_info-link"> ' +
						  		'<i>Размер<span>'+decodeURIComponent(goods.size)+'</span></i>' +
						  '</span>' +
						  	'<span class="a-else-goods__description_info-link"> ' +
						  		'<i>Цвет<span>'+decodeURIComponent(goods.color)+'</span></i>' +
						  	'</span>' +
						  	'<span class="a-else-goods__description_info-link"> ' +
						  		'<i>Ткань<span>'+(decodeURIComponent(goods.material)).replace(/,|;/g , '<br />')+'</span></i>' +
						  	'</span>' +
						 '</div>' +
						  '<p class="a-old-price">Розничная цена<span>3000 руб.</span></p>' +
						 ' <p class="a-new-price">Начальная ставка<span>1000 руб.</span></p>' +
						'</div>' +
					 '</div>';


		return template;			 
	}


}

export default AsyncLoad;