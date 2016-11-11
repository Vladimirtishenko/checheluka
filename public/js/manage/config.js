import Helper from '../helper.js';

import Flatpickr from 'flatpickr';

class Config extends Helper {
    constructor(el) {
        super();
        if (!el) return;

        this.saveDate = document.querySelector('.a-date-save');
        this.calendarInput = document.querySelector('.a-flatpickr');
        this.datetoView = document.querySelector('.a-startet-date span');
        this.resultHandler = document.querySelector('.a-result');

        this.flyEvent('add', ['click'], [this.saveDate], this.handlerToSave.bind(this));

        this.setInputCalendar();

    }

    handlerToSave() {

        if (!this.calendarInput.value) return;

        let date = new Date();

        if (+new Date(this.calendarInput.value)) {
            date = new Date(this.calendarInput.value);
        } else {
            date = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        }

        this.datetoView.innerHTML = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

        this.xhrRequest('POST', '/page_config', 'application/x-www-form-urlencoded', 'date='+(+date), this.responseToSaveDate.bind(this));

    }

    setInputCalendar(obj) {

        new Flatpickr(this.calendarInput, {
            minDate: new Date(),
            inline: true,
            enableTime: true
        });
    }

    responseToSaveDate(obj){

    	try{
    		let data = JSON.parse(obj);

    		if(data.status == 200){
    			this.resultHandler.innerHTML = "Дата успешно установлена!";
    		} else {
    			this.resultHandler.innerHTML = "Дата не установлена ошибка сервера! Попробуйте обновить страницу!";
    		}

    	} catch(e){}

    }

}

export default Config;
