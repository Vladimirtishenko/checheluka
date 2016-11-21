import Helper from '../helper.js';

class ChangeStatus extends Helper {
	constructor(elem){
		super();
		if(!elem) return;

		this.view = elem;

		this.flyEvent('add', ['click'], [this.view], this.checkedSelect.bind(this));

	}

	findSelected(number){
		let status = {
			0: "Не оплачен",
			1: "Оплачен",
			2: "Отменен"
		}

		return status[number];
	}

	checkedSelect(event){

		let target = event && event.target && event.target.classList.contains('a-privat-table__submit') ? event.target : null;

		if(!target) return;

		let selected = target.previousElementSibling,
			value = selected.value,
			fieldToReplace = selected.previousElementSibling,
			orderNumber = target.getAttribute('data-value');

			fieldToReplace.firstElementChild.innerHTML = this.findSelected(value);
		
		this.xhrRequest('POST', '/orderAdminLoads', 'application/x-www-form-urlencoded', 'status='+value+'&orderNumber='+orderNumber, this.responseChange.bind(this));

	}

	responseChange(obj){
		console.log(obj);
	}

}

export default ChangeStatus;