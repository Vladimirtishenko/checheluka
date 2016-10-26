'use strict';
import '../../styl/manage/default_manage.styl';

import Router from './router.js';

window.globalRegistredModules = {};

window.addEventListener('DOMContentLoaded', () => {
	new Router();
})
