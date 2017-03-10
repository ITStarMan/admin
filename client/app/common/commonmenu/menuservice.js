/**
 * author liuchang
 */

'use strict';

export default class MenuService {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  };
  /**
   * 获取侧边栏数据
   */
  fetchMenuList(params) {
    return this.Api.get('/home/fetchMenuList', params).then(
      res => { return res }
    )
  }
}