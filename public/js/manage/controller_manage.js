'use strict';
import '../../styl/manage/default_manage.styl';


import ModalGoodsToAdd from './add_or_delete_action.js';
import AsyncLoadFromAnouterResourse from './all_goods_load.js';
import Config from './config.js';

window.globalRegistredModules = {};

window.addEventListener('DOMContentLoaded', () => {
	new AsyncLoadFromAnouterResourse(document.querySelector('.a-table-admin.__a-for-goods') || document.querySelector('.a-table-admin.__a-for-auction'));
	new Config(document.querySelector('.a-table-admin.__a-for-config'));
})
