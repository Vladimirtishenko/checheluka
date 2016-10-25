'use strict';
import '../../styl/manage/default_manage.styl';

import Router from './router.js';

window.addEventListener('DOMContentLoaded', () => {
	new Router("/");
	/*new ModalGoodsToAdd(document.querySelector('.a-form-checheluka-admin-table'));
	new AsyncLoadFromAnouterResourse(document.querySelector('.a-form-checheluka-admin-table'));*/
})
