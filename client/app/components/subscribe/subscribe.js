import subscribeComponent from './subscribe.component';
import {Button,CustomTable,ffanTable} from 'fancyui';
export default angular.module('subscribe', [
	Button.name,
	CustomTable.name,
	ffanTable.name
])
.component('subscribe', subscribeComponent);
