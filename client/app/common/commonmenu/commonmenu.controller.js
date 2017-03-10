
'use strict';

export default class commonMenuController {
	constructor(MenuService, $rootScope) {
		"ngInject";
		this.MenuService = MenuService;
		this.$rootScope = $rootScope;
		this.menulist = '';
		this.config = {
			childrenAttr: '_child',
			idAttr: 'id',
			parentAttr: 'pid',
			textAttr: 'name',
			hrefAttr: 'url',
			iconAttr: 'icon',
			matchCurrentUrl: node => {
				if(node.url && node.url.indexOf('#') > -1) {
					let nodeHash = node.url.split("#")[1];
					let key = nodeHash.split("/")[1];
					if(location.hash.indexOf(key) > -1) {
						return true;
					}
				}
				return false;
      }
		};
		this.fetchMenuList();
	}

	fetchMenuList() {
		this.$rootScope.$on('CHANGE_HEADER', (e, params) => {
			if (params && params.pid) {
				this.menulist = '';
				this.MenuService.fetchMenuList(params).then(
					res => { 
						this.menulist = (res && res.length > 0) ? res : ''
					}
				)
			}
		})
	}

	onSelect(node)  {
		node && node.url.trim() && node.url.trim() != "#" && (location.href = `${location.origin}${node.url}`);
	}
}
