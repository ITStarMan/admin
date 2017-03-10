import logoImg from './images/ffan_logo.png';

'use strict';

export default class commonHeaderController {
	constructor(HeaderService, $rootScope) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.HeaderService = HeaderService;
		this.logoImg = logoImg;
		this.userInfo = {};
		this.headerList = [
			{id: 1, url: '/home/index', name: '首页' },
			{id: 77, url: '/home/index', name: '商家中心' },
			{id: 78, url: '#/apps/list', name: '开发者中心', active: true },
			{id: 79, url: '/home/index', name: '服务商中心' },
		]
		this.getHeaderList();
		this.fetchUserInfo();
	}
	/**
	 * 获取头部列表
	 */
	 getHeaderList() {
		 this.HeaderService.getHeaderList({pid: 0}).then(
			 res => {
				 if (res) {
					 angular.forEach(res, (value, index) => {
						 if (value.name == "开发者中心") {
							 value.active = true;
							 this.changeHeader({id: value.id}, false);
						 }
					 })
					 this.headerList = res;
				 }
			 }
		 )
	 }
	 /**
		* 获取用户信息
	  */
	fetchUserInfo() {
		this.HeaderService.fetchUserInfo().then(
			res => {
				res && (this.userInfo = res)
			}
		)
	}
	/**
	 * 切换头部
	 */
	changeHeader(list, type) {
		if (list && list.id) {
			this.$rootScope.$broadcast('CHANGE_HEADER', {pid: list.id});
			type && (window.location.href = `${location.origin}${list.url}`);
		}
	}
	/**
	 * 退出
	 */
	logout() {
		let url = '';
		if (process.env.DEBUG) {
			url = `http://oc.sit.ffan.net/login/logout`;
		} else {
			url = `${location.origin}/login/logout`;
		}
		window.location.href = url;
	}
}
