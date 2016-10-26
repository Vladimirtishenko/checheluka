import Helper from '../helper.js';

import AsyncLoadFromAnouterResourse from './all_goods_load.js';
import AsyncLoadFromOwnResourse from './all_goods_load_own.js';

class Templates extends Helper{
	
	allGoods(obj){


		function templates(img, title, description, size, color, consistOf, material){

			 let sizeEach = (sizes) => {
			 	let sizesToArray = sizes.split(',');

			 	let sizesTmp = ""
			 	sizesToArray.forEach((item, i) => {
			 		sizesTmp += '<label for=""><span>'+item+'</span>' +
					              '<input type="checkbox" name="size" value="'+item+'"/>' +
					            '</label>';
			 	});

			 	return sizesTmp;
			 }

		     let tmp = '<div class="a-all-goods-table__item">' +
					   		'<img src="'+img+'" alt=""/>' +
						    '<div class="a-all-goods-table__description">' +
						      '<p class="a-all-goods-table__description_info">'+title+'</p>' +
						    '</div>' +
						    '<div class="a-hidden-block">' +
						      '<div class="a-hidden-block__description">' +
						        '<div class="a-hidden-block__description__outer">' +
						        	'<span class="a-hidden-block__description-link">'  +
						        		'<i>Размер </i>' +
						        		'<span>'+size+'</span>' +
						        	'</span>' +
						        	'<span class="a-hidden-block__description-link"> ' +
						        		'<i>Цвет</i>' +
						        		'<span>'+color+'</span>' +
						        	'</span>' +
						        '</div>' +
						      '</div>' +
						   '</div>' +
						    '<form class="a-hidden-form">' +
						      '<input type="hidden" name="title" value="'+title+'"/>' +
						      '<input type="hidden" name="description" value="'+description+'"/>' +
						      '<input type="hidden" name="color" value="'+color+'"/>' +
						      '<input type="hidden" name="src" value="'+img+'"/>' +
						      '<input type="hidden" name="consistOf" value="'+consistOf+'"/>' +
						      '<input type="hidden" name="material" value="'+material+'"/>' +
						      '<div class="a-container-for-img"><img src="'+img+'" alt=""/></div>' +
						      '<div class="a-hidden-form_description">' +
						        '<div class="a-containet-flex-to-start-description">' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__title">'+title+'</p>' +
						          '</div>' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__else_params">Цвет</p><span>'+color+'</span>' +
						          '</div>' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__else_params">Размеры</p>' +
						            sizeEach(size) +
						          '</div>' +
						        '</div>' +
						        '<div class="a-containet-flex-to-end-button">' +
						          '<input value="Добавить товар" type="submit" class="a-button-white"/>' +
						        '</div>' +
						      '</div>' +
						    '</form>' +
						 '</div>';

			return tmp;

		}


		let mainblock = '<div class="a-all-goods-table a-form-checheluka-admin-table"> </div>';

		let buttonToLoadMore = '<div class="a-button-download-more">' + 
  									'<button class="a-button-white">Загрузить еще</button>' +
								'</div>';

		new AsyncLoadFromAnouterResourse(templates, mainblock, buttonToLoadMore);
	}


	allGoodsAuction(){

		function templates(id, img, title, description, size, color, consistOf, material, count, priority){

		     let tmp = '<div class="a-all-goods-table__item">' +
		     				'<span class="a-delete-this-item-with-id" data-id="'+id+'"></span>' +
					   		'<img src="'+decodeURIComponent(img)+'" alt=""/>' +
						    '<div class="a-all-goods-table__description">' +
						      '<p class="a-all-goods-table__description_info">'+decodeURIComponent(title)+'</p>' +
						    '</div>' +
						    '<div class="a-hidden-block">' +
						      '<div class="a-hidden-block__description">' +
						        '<div class="a-hidden-block__description__outer">' +
						        	'<span class="a-hidden-block__description-link">'  +
						        		'<i>Размер </i>' +
						        		'<span>'+decodeURIComponent(size)+'</span>' +
						        	'</span>' +
						        	'<span class="a-hidden-block__description-link"> ' +
						        		'<i>Цвет</i>' +
						        		'<span>'+decodeURIComponent(color)+'</span>' +
						        	'</span>' +
						        '</div>' +
						      '</div>' +
						   '</div>' +
						   '<form class="a-hidden-form">' +
						      '<input type="hidden" name="_id" value="'+id+'"/>' +
						      '<input type="hidden" name="title" value="'+decodeURIComponent(title)+'"/>' +
						      '<input type="hidden" name="description" value="'+decodeURIComponent(description)+'"/>' +
						      '<input type="hidden" name="color" value="'+decodeURIComponent(color)+'"/>' +
						      '<input type="hidden" name="src" value="'+decodeURIComponent(img)+'"/>' +
						      '<input type="hidden" name="consistOf" value="'+decodeURIComponent(consistOf)+'"/>' +
						      '<input type="hidden" name="material" value="'+decodeURIComponent(material)+'"/>' +
						      '<div class="a-container-for-img"><img src="'+decodeURIComponent(img)+'" alt=""/></div>' +
						      '<div class="a-hidden-form_description">' +
						        '<div class="a-containet-flex-to-start-description">' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__title">'+decodeURIComponent(title)+'</p>' +
						          '</div>' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__else_params">Цвет</p><span>'+decodeURIComponent(color)+'</span>' +
						          '</div>' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__else_params">Размеры</p>' +
						            '<span>'+decodeURIComponent(size)+'</span>' +
						          '</div>' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__else_params">Колличество на складе</p>' +
						            '<input type="text" name="countInWarehouse" value="'+(count || 1)+'"/>' +
						          '</div>' +
						          '<div class="container-description-form">' +
						            '<p class="container-description-form__else_params">Приоритет</p>' +
						            '<input type="checkbox" name="priority" '+ (priority ? "checked" : "") +' />' +
						          '</div>' +
						        '</div>' +
						        '<div class="a-containet-flex-to-end-button">' +
						          '<input value="Добавить товар" type="submit" class="a-button-white"/>' +
						        '</div>' +
						      '</div>' +
						    '</form>' +
						 '</div>';

			return tmp;
		}

		let mainblock = '<div class="a-all-goods-table a-form-checheluka-admin-table___own_base"> </div>';

		let buttonToLoadMore = '<div class="a-button-download-more">' + 
  									'<button class="a-button-white">Загрузить еще</button>' +
								'</div>';

		new AsyncLoadFromOwnResourse(templates, mainblock, buttonToLoadMore);

	}



}

export default Templates;