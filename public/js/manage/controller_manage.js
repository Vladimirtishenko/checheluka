'use strict';
import '../../styl/manage/default_manage.styl';

import ModalGoodsToAdd from './add_goods.js';

window.addEventListener('DOMContentLoaded', () => {
	new ModalGoodsToAdd(document.querySelector('.a-form-checheluka-admin-table'));
})
