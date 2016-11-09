class Template {
	getCurrentAuction(obj, timer){
		return '<div class="a-general-goods a-animates-top-goods">' + 
				  '<div class="a-general-goods__image">' +
				  	'<span class="a-general-number__this_main">№1</span>' +
				   	'<div class="a-img-scale">' +
				    	'<img src="'+decodeURIComponent(obj.src)+'" alt=""/>' +
				    '</div>' +
				  '</div>' +
				  '<div class="a-general-goods__description">' +
				    '<p class="a-general-goods__description_in-warehouse a-min-size-font">На складе: <span>'+decodeURIComponent(obj.countInWarehouse)+' штук</span></p>' +
				    '<h2 class="a-general-goods__description_title">'+decodeURIComponent(obj.title)+'</h2>' +
				    '<p class="a-general-goods__description_description">'+decodeURIComponent(obj.description)+'</p>' +
				    '<div class="a-general-goods__description_info">' +
				      '<div class="a-general-goods__description_info_part">' +
				      	'<a href="" class="a-general-goods__description_info_part-link">' +
				      		'<i>Размер:</i>' +
				      		'<span>'+decodeURIComponent(obj.size)+'</span>' +
				      	'</a>' +
				      	'<a href="" class="a-general-goods__description_info_part-link">'  +
				      		'<i>Цвет:</i>' +
				      		'<span>'+decodeURIComponent(obj.color)+'</span>' +
				      	'</a>' +
				      '</div>' +
				      '<div class="a-general-goods__description_info_part">' +
				      	'<a href="" class="a-general-goods__description_info_part-link">' +
				      		'<i>Состав:</i>' +
				      		'<span>'+decodeURIComponent(obj.consistOf)+'</span>' +
				      	'</a>' +
				      	'<a href="" class="a-general-goods__description_info_part-link">'  +
				      		'<i>Материал: </i>' +
				      		'<span>'+decodeURIComponent(obj.material)+'</span>' +
				      	'</a>' +
				      '</div>' +
				    '</div>' +
				    '<p class="a-general-goods__description_price_retail">Розничная цена: <span>'+decodeURIComponent(obj.price)+' рублей</span></p>' +
				    '<p class="a-general-goods__description_price_now">'+decodeURIComponent(obj.auctionPrice)+' <span>руб.</span></p>' +
				    '<div class="a-for-mobile-absolute">' +
				      '<div class="a-general-goods__time_to_end">' +
				        '<button class="a-general-goods__description_buy a-button-black a-inactive">Покупаю</button>' +
				        '<p>До завершения -  <span class="a-times-frontend">00:'+(timer < 10 ? '0' + timer : timer)+'</span></p>' +
				      '</div>' +
				      '<p class="a-info-about-rates">Кнопки станут активны когда в торгах останеться 10 человек</p>' +
				      '<div class="a-general-goods__description_rates_button a-rates-inactive">' +
				        '<button class="a-button-white">+ 1 руб.</button>' +
				        '<button class="a-button-white">+ 10 руб.</button>' +
				        '<button class="a-button-white">+ 100 руб.</button>' +
				        '<button class="a-button-white">+ 500 руб.</button>' +
				      '</div>' +
				    '</div>' +
				  '</div>' +
				'</div>';
	}

	getAuctions(obj, className){

		return '<div class="a-else-goods__item '+ className +'" >' +
						'<div class="a-resizer-masonry">' +
							'<img src="'+decodeURIComponent(obj.src)+'" class="a-image-to-zoom"/>' +
						'</div>' +
						'<div class="a-else-goods__description">' +
						  '<p class="a-number-goods"> №' +
						    '<span></span>' +
						  '</p>' +
						  '<p class="a-else-goods-descroption">Шапка писец</p>' +
						  '<div class="a-else-goods__description_info">' +
						  	'<span class="a-else-goods__description_info-link">'  +
						  		'<i>Состав<span>'+decodeURIComponent(obj.consistOf)+'</span></i>' +
						  	'</span>' +
						  	'<span class="a-else-goods__description_info-link"> ' +
						  		'<i>Размер<span>'+decodeURIComponent(obj.size)+'</span></i>' +
						  '</span>' +
						  	'<span class="a-else-goods__description_info-link"> ' +
						  		'<i>Цвет<span>'+decodeURIComponent(obj.color)+'</span></i>' +
						  	'</span>' +
						  	'<span class="a-else-goods__description_info-link"> ' +
						  		'<i>Ткань<span>'+(decodeURIComponent(obj.material)).replace(/,|;/g , '<br />')+'</span></i>' +
						  	'</span>' +
						 '</div>' +
						  '<p class="a-old-price">Розничная цена<span>'+(decodeURIComponent(obj.price))+' руб.</span></p>' +
						 ' <p class="a-new-price">Начальная ставка<span>'+(decodeURIComponent(obj.auctionPrice))+' руб.</span></p>' +
						'</div>' +
					 '</div>';
	}
}

export default new Template;