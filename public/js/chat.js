import Helper from './helper.js';

class Chat extends Helper {
	constructor() {
		super();
		this.button = document.querySelector('.a-chat-container__button');
		this.flyEvent('add', ['click'], [this.button], this.chatHandler.bind(this));
		this.arrayPosition = ['-631px 0', '-684px 0']
	}

	chatHandler(){
		let chat = document.querySelector('.a-chat-container');
		if(!chat) return;

		chat.classList.toggle('-animate-chat');
		this.button.style.cssText = "background-position: "+ this.arrayPosition[0];
		this.arrayPosition.reverse();
	}
}

export default Chat;