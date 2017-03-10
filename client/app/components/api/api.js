import apiComponent from './api.component';
import {Button,ffanTable,Service} from 'fancyui';

export default angular.module('api', [
	Button.name,
	ffanTable.name,
	Service.name
])
.component('api', apiComponent);
