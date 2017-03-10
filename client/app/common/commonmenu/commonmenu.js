import angular from 'angular';
import component from './commonmenu.component';
import MenuService from './menuservice.js';

import { Menu } from 'fancyui';

export default angular.module('commonmenu', [
	Menu.name
])
	.component('commonmenu', component)
	.service({MenuService});
