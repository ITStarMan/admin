import infoComponent from './info.component';
import {Button,ffanTable} from 'fancyui';
export default angular.module('info', [
	Button.name,
	ffanTable.name,
])
.component('info', infoComponent);
