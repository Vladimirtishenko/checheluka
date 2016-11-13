'use strict';
import '../styl/general.styl';

import Sockets from './socket.js';
import Modal from './modal.js';
import Chat from './chat.js';
import Zoom from './zoomImg.js';
import Async from './asyncLoad.js';
import AsyncAllGoods from './asyncLoadAllGoods.js';
import Timer from './timerToStart.js';

window.$app = {};

window.addEventListener('DOMContentLoaded', () => {
	$app.socket = new Sockets();
	new Timer(document.querySelector('.a-time-to-start'));
	new Modal();
	new Async(document.querySelector('.a-backgroung-general-goods'));
	new Chat();
	new AsyncAllGoods(document.querySelector('.a-all-goods-table'));
	new Zoom(document.querySelector('.a-zoom-container'));
})


