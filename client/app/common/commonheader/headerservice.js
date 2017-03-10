/**
 * author liuchang
 */

'use strict';

export default class HeaderService {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  };
  /**
   * 获取头部列表数据
   */
  getHeaderList(params) {
    return this.Api.get('/home/fetchMenuList', params).then(
      res => { return res }
    ) 
  }
  /**
   * 获取用户数据
   */
  fetchUserInfo() {
    return this.Api.get('/home/fetchUserInfo').then(
      res => { return res },
      res => {
        if (res && res.status == 5501 && res.message) {
          window.alert(res.message);
          if (process.env.DEBUG) return;
          window.location.href = `${location.origin}/login/index`;
        } else if (res && res.status == 5502 && res.message) {
          window.alert(res.message);
        }
      }
    )
  }
}