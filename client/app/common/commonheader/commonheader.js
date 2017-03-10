import component from './commonheader.component';
import HeaderService from './headerservice'

export default angular.module('commonheader', [])
	.component('commonheader', component)
	.service({HeaderService})