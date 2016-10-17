'use strict';
import '../styl/general.styl';

import Helper from './helper.js';

class Controller extends Helper {
	constructor() {
		super();
		const socket = io(); 
		socket.emit('chat message', 'HELLO FROM CLIENT');
	}

	init(){
		this.date();
	}
	
}

new Controller();