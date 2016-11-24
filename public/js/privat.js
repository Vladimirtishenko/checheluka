import Helper from './helper.js';

class Privat extends Helper {
	constructor(el) {
		super();
		if(!el) return;

		this.button = el;
		this.form = document.querySelector('.a-data-order');
		this.sendButton = document.querySelector('.a-data-order-send');

		this.flyEvent('add', ['click'], [this.button], [this.openForm.bind(this)]);
		this.flyEvent('add', ['click'], [this.sendButton], this.sendForm.bind(this));
	}

	openForm(event){

		if(!event && !event.target) return;

		$app.modalOpen({attr: 'order'});

	}

	sendForm(event){

		event.preventDefault();

		let parentForm = event && event.target && event.target.closest('form') || null,
			data = {};

		if(!parentForm) return;

		let elementsUserData = parentForm.elements,
			dataGoods = this.returnsDataObjectGoods(this.form.elements);

		data.goods = dataGoods.goods;
		data.priceCommon = dataGoods.priceCommon;

		for (var i = 0; i < elementsUserData.length; i++) {
			if(elementsUserData[i].type == 'text' || elementsUserData[i].tagName == "SELECT"){
				data[elementsUserData[i].name] = encodeURIComponent(elementsUserData[i].value);
			}
		}	

		data.date = new Date();
		data.status = 0;

		this.xhrRequest('POST', '/orderCreate', 'application/json', JSON.stringify(data), this.afterResponse.bind(this, parentForm));


	}

	afterResponse(form, obj){

		try {
			let object = JSON.parse(obj);
			if(object.status == 200){
				form.insertAdjacentHTML('beforeend', '<p class="a-notify">Ваш заказ отправлен на обработку!</p>');
				this.form.parentNode.removeItem(this.form);
				this.el.closest('.a-privat-price-to-change').removeItem(this.el);
			} else {
				form.insertAdjacentHTML('beforeend', '<p class="a-notify">Произошла ошибка, попробуйте позже!</p>');
			}
		} catch(e){}

	}

	returnsDataObjectGoods(elems){

		let goods = {},
			priceCommon = 0;

		for (var i = 0; i < elems.length; i++) {
			priceCommon += parseInt(elems[i].getAttribute('data-price'));
			goods[i] = {
				id: elems[i].getAttribute('data-id'),
				count: elems[i].getAttribute('data-count'),
				price: elems[i].getAttribute('data-price'),
				title: elems[i].getAttribute('data-title'),
				size: elems[i].getAttribute('data-size'),
				image: elems[i].getAttribute('data-image'),
				color: elems[i].getAttribute('data-color'),
				art: elems[i].getAttribute('data-art')
			}
		}

		return {priceCommon: priceCommon, goods: goods};

	}

}

export default Privat;