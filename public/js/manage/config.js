import Helper from '../helper.js';

import Flatpickr from 'flatpickr';

class Config extends Helper {
	constructor(templates, header, url){
		super();
		//if(!templates || typeof templates != "function") return;

		this.viewElement = document.querySelector('view');
		this.header = header;

		this.viewElement.insertAdjacentHTML('beforeend', header+templates());

		new Flatpickr(document.querySelector('.a-flatpickr'), {
			minDate: new Date(),
			inline: true,
		    enableTime: true
		});

	}

}

export default Config;