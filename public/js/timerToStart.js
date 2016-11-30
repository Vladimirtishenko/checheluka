import Helper from './helper.js';

class Timer extends Helper {
	constructor(el){
		super();
		if(!el) return;
		this.el = el;
		this.attr = this.el.getAttribute('data-time');
		this.removed = el.querySelector('.a-replaced-time-container');

		$app.synteticTime = this.synteticEventTimer.bind(this);
		$app.getTime = this.getTime.bind(this);

		this.createTimer();

	}

	getTime(){
		return this.timeStatus;
	}

	createTimer(){

		if(!this.attr || this.attr == 'null'){
			this.removed.innerHTML = "Аукцион начался..."
		} else {
			this.estimate = new Date(+this.attr);

			this.tryTime();
			
		}
	}

	synteticEventTimer(time){
		this.estimate = new Date(+time);
		this.tryTime();
	}

	tryTime(){

		if(Date.parse(new Date()) >= Date.parse(this.estimate)){

			this.timeStatus = true;

			this.el.innerHTML = '<p> До начала аукциона осталось: </p>' +
								'<i class="a-replaced-time-container"> Аукцион начался</i>';

			this.removed = this.el.querySelector('.a-replaced-time-container');

			try {
				clearInterval(this.timerGlobal);
			} catch(e){}

			return false;

		} else {
			this.timeStatus = false;
			this.startTimer();
		}

	}

	startTimer(){

		let date = Date.parse(this.estimate) - Date.parse(new Date()),
			dateString = {
				seconds: Math.floor( (date/1000) % 60 ),
				minutes: Math.floor( (date/1000/60) % 60 ),
				hours: Math.floor( (date/(1000*60*60)) % 24 ),
				days: Math.floor( date/(1000*60*60*24) )
			}

		if(this.removed){
			this.removed.parentNode.removeChild(this.removed);
			this.removed = null;
			let span = document.createElement('span');
			this.span = this.el.appendChild(span);
			this.createTime(dateString);
		} else {
			this.createTime(dateString);
		}

		this.timerGlobal = setTimeout(() => {
			this.tryTime();
		}, 1000)

	}

	createTime(dateString){
		this.span.innerHTML = ((dateString.days) ? dateString.days + '<mark>дней</mark>' : '') + 
								(dateString.hours < 10 ? '0' + dateString.hours : dateString.hours) + ':' +
								(dateString.minutes < 10 ? '0' + dateString.minutes : dateString.minutes) + ':' +
								(dateString.seconds < 10 ? '0' + dateString.seconds : dateString.seconds);
	}

}

export default Timer;