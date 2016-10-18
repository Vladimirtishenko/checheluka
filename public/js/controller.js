'use strict';
import '../styl/general.styl';

import Helper from './helper.js';

class Controller extends Helper {
	constructor() {
		super();
		const socket = io(); 
		socket.emit('chat message', 'HELLO FROM CLIENT');
		this.initEvent();
	}

	initEvent(){
		this.flyEvent(['click'], [document.querySelector('.a-chat-container__button')], this.chatHandler);
	}

	chatHandler(){
		let chat = document.querySelector('.a-chat-container');
		if(!chat) return;

		chat.classList.toggle('-animate-chat');

	}
}

window.addEventListener('DOMContentLoaded', () => {
	new Controller();
})




