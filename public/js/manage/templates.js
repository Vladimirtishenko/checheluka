import Helper from '../helper.js';

import AsyncLoadFromAnouterResourse from './all_goods_load.js';

class Templates extends Helper{
	
	allGoods(obj){


		function templates(img, title, description, size, color){

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


		let classForTemplate = 'a-form-checheluka-admin-table';

		new AsyncLoadFromAnouterResourse(templates, classForTemplate);
	}


	allGoodsAuction(){
		
	}



}

export default Templates;