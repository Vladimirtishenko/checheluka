'use strict';
import '../styl/general.styl';

import Sockets from './socket.js';
import Modal from './modal.js';
import Chat from './chat.js';

window.addEventListener('DOMContentLoaded', () => {
	new Sockets();
	new Modal();
	new Chat();
	
})


