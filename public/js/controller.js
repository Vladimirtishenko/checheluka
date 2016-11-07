'use strict';
import '../styl/general.styl';

import Sockets from './socket.js';
import Modal from './modal.js';
import Chat from './chat.js';
import Zoom from './zoomImg.js';
import Async from './asyncLoad.js';
import AsyncAllGoods from './asyncLoadAllGoods.js';

window.$app = {};

window.addEventListener('DOMContentLoaded', () => {
	$app.socket = new Sockets();
	new Modal();
	new Chat();
	new Async(document.querySelector('.a-else-goods'));
	new AsyncAllGoods(document.querySelector('.a-all-goods-table'));
	new Zoom(document.querySelector('.a-zoom-container'));
})


