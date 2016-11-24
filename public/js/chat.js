import Helper from './helper.js';

class Chat extends Helper {
	constructor(el) {
		super();
		if(!el) return;
		this.el = el;
		this.beforeEl = document.querySelector('.a-chat-title');
		this.button = document.querySelector('.a-chat-container__button');
		this.flyEvent('add', ['click'], [this.button], this.chatHandler.bind(this));
		this.arrayPosition = ['-631px 0', '-684px 0'];


		$app.chat = {
			add: this.addChat.bind(this),
			addWinner: this.addWinner.bind(this),
			clearTemplate: this.clearTemplate.bind(this),
			clear: this.clearChat.bind(this)
		}

	}

	chatHandler(){
		this.el.classList.toggle('-animate-chat');
		this.button.style.cssText = "background-position: "+ this.arrayPosition[0];
		this.arrayPosition.reverse();
	}

	addChat(pretendents, price){

		if(Object.keys(pretendents).length == 0) return;

		this.beforeEl.insertAdjacentHTML('afterend', this.chatTemplate(pretendents, price));



	}


	addWinner(winner, price){

		this.beforeEl.insertAdjacentHTML('afterend', this.chatTemplateWinner(winner, price));

	}


	clearChat(){
		let template =  '<div class="a-block-with-proposal">' + 
									    '<p class="a-block-with-proposal__buy_now">Аукционы пока не начались! </p>' + 
									'</div>';

		this.beforeEl.insertAdjacentHTML('afterend', template);

	}

	clearTemplate(id){

		let template = '<div class="a-block-with-proposal">' + 
						    '<p class="a-block-with-proposal__buy_now">Торги по аукциону <span>№'+id+'</span></p>' + 
						'</div>';

		this.beforeEl.insertAdjacentHTML('afterend', template);
	}

	chatTemplateWinner(pretendents, price){
		let win = Object.keys(pretendents).length;

		let template = '<div class="a-block-with-proposal">' + 
						    '<p class="a-block-with-proposal__buy_now">Купили товар за <span>'+price+' руб.</span></p>' + 
						   ' <p class="a-block-with-proposal__user">'+
						   		((win == 0) ? "Нет победителей" : this.chatTemplateUsers(pretendents)) +
						   '</p>' + 
						'</div>';

		return template;
	}

	chatTemplate(pretendents, price){

		let template = '<div class="a-block-with-proposal">' + 
						    '<p class="a-block-with-proposal__buy_now">Готовы купить за<span>'+price+' руб.</span></p>' + 
						   ' <p class="a-block-with-proposal__user">'+
						   		this.chatTemplateUsers(pretendents) +
						   '</p>' + 
						'</div>';

		return template;
	}


	chatTemplateUsers(pretendents){

		let template = ''

		if(Object.keys(pretendents).length > 10){
			template = Object.keys(pretendents).length + 'чел.'
		} else {
			for(var user in pretendents){
				template += '<i>'+pretendents[user].email+'</i>';
			}
		}

		return template;
	}
}

export default Chat;