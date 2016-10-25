import Helper from '../helper.js';

class ModalGoodsToAdd extends Helper {
	constructor(elem){
		super();
		if(!elem) return;
		this.modalAddGoods = document.querySelector('.a-conteiner-flexible-fixed');
		this.closeModal = document.querySelector('.a-modal-close');
		this.flyEvent('add', ['click'], [elem, this.closeModal], [this.handlerToAddGoods.bind(this), this.handlerToCloseGoods.bind(this)]);
	}

	handlerToAddGoods(event){
		let target = event && event.target,
			elementToCheck = (target.classList.contains('a-all-goods-table__item')) ? target : (target.closest('.a-all-goods-table__item')) ? target.closest('.a-all-goods-table__item') : null;

		if(!elementToCheck) return;

		let form = elementToCheck.querySelector('.a-hidden-form').cloneNode(true);

		this.flyEvent('add', ['submit'], [form], [this.handlerToAddGoodsValidation.bind(this)]);

		this.modalAddGoods.appendChild(form);

		this.cssHelper([this.modalAddGoods], ["right: 0%"]);


		this.animationEndEvent = this.animationEnd.bind(this);

	}

	handlerToCloseGoods(){
		this.flyEvent('add', ['transitionend'], [this.modalAddGoods], [this.animationEndEvent])
		this.cssHelper([this.modalAddGoods], ["right: 100%"]);
		
	}

	animationEnd(){
		this.modalAddGoods.removeChild(this.modalAddGoods.lastElementChild);
		this.flyEvent('remove', ['transitionend'], [this.modalAddGoods], [this.animationEndEvent])
	}

	handlerToAddGoodsValidation(event){
		event.preventDefault();
		let form = event && event.target,
			elementsCheckbox = form.querySelectorAll('input[type="checkbox"]'),
			elementsAllWithoutCheckbox = form.querySelectorAll('input[type="hidden"]'),
			data = [];

			for (var i = 0; i < elementsCheckbox.length; i++) {

				if(elementsCheckbox[i].checked){
					data.push(helpToValidate(elementsCheckbox[i]));
				}
				
			}


		function  helpToValidate(checkbox) {
			let templateData = {};
			for (var i = 0; i < elementsAllWithoutCheckbox.length; i++) {
				templateData[elementsAllWithoutCheckbox[i].name] = elementsAllWithoutCheckbox[i].value
			}

			templateData[checkbox.name] = encodeURIComponent(checkbox.value);

			return templateData;

		}

			
		this.xhrRequest("POST", '/allGoods', 'application/json; charset=utf-8', JSON.stringify(data), this.handlerToResponse.bind(this))
		
	}


	handlerToResponse(obj){
		if(!JSON.parse(obj)) return;
		let status = (JSON.parse(obj)).status;
		if(status == 200){
			this.handlerToCloseGoods();
		}

	}

}

export default ModalGoodsToAdd;