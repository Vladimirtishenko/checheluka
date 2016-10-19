import Helper from './helper.js';

class Chat extends Helper {
	constructor() {
		super();
		this.flyEvent(['click'], [document.querySelector('.a-chat-container__button')], this.chatHandler);
	}

	chatHandler(){
		let chat = document.querySelector('.a-chat-container');
		if(!chat) return;

		chat.classList.toggle('-animate-chat');
	}
}

export default Chat;