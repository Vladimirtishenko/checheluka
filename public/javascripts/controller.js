'use strict';

let Helper = require('./helper.js');
/*let SocketIO = require('./');*/


class Controller extends Helper {
	constructor() {
		super();
		this.init();
	}

	init(){
		this.date();
	}
	
}


new Controller();