/**
 * (description)
 *
 * @author yourname
 */

import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'

export default class EndpointController {
  constructor(NgTableParams,  $rootScope) {
    'ngInject';
    this.name = '路径管理';
    this.NgTableParams = NgTableParams;
    this.$rootScope = $rootScope;
    this.init();
    this.loadPromise = {
      'total': 0,
      'datas': [ ]
    };
    // 查询条件数据模型
    this.query = {
      "UserId": '',
      "EndpointName" : '',
      "EndpointID" : '',
      "UriRoute" : '',
      "ApiID" : '',
      "UserEmail" : '',
      "UserName" : '',
      "Status" : '',
      "page" : 1,      // 页码  默认第一页
      "limit" : 10     // 每页多少个  默认每页10条
    }
  }

  init(num){
      let self = this;
      self.tableParams = new this.NgTableParams({
        page: 1,
        count: num == undefined ? 20 : num
      }, {
        counts: [10,20,30],
          getData: function (params) {
            /*self.loading = self.LoadingService.loading({
			      target: '.table-container',
			      text: 'loading...'
			    })*/
				$('body').animate( {scrollTop: 0}, 0)
				$('.main-content').animate( {scrollTop: 0}, 0)
          self.query.page = parseInt(params.url().page)
          self.query.limit = parseInt(params.url().count)
	    		return commonSvc.post(self.query,'v1/endpoint/admin', 1).then((result)=>{
            if (result.status == 200) {
              self.loadPromise.datas = result.data.List == null ? [] : result.data.List;
              if (self.loadPromise.datas.length > 0) {
                for (let i = 0; i < self.loadPromise.datas.length; i++) {
                  try {
                    self.loadPromise.datas[i].UserName = result.data.Account[self.loadPromise.datas[i].UserID].nick
                    self.loadPromise.datas[i].UserEmail = result.data.Account[self.loadPromise.datas[i].UserID].email
                  } catch (e) {
                    window.console.log(e);
                  } finally {

                  }
                }
              }
              self.loadPromise.total = result.data.TotalCount;
              let temp = result
              temp.data.List = result.data.List == null ? [] : result.data.List;
              return temp;
            } else {
              window.alert(result.message)
            }
          }).then((res)=>{
		        	//self.loading && self.loading.close();
		            params.total(res.data.TotalCount);
		            return res.data.List;
		        })
        }
      });
  }
  toID (email) {
    // 邮箱获取id
		let postParams = {
			'emails': email
		}
		let self = this
		return commonSvc.getData(postParams,'passport/account-uids.json',4).then((res)=>{
			if(res && res.status == 200){
				if(res.attachment[email]){
					return res.attachment[email]
				}else{
					return -1
				}
			}else{
				window.alert(res.message)
			}
		}).then((result)=>{
			return result
		})
	}

  lookup (row) {
      // 跳转到对应日志详情页
      window.location.href = getDomain.getUrl('endpointdetail/' + row.EndpointID);
  }

  reviewed (row) {
    // 审核通过
  }

 Submit () {
    let self = this;
    // 接口要求必须为数字的，在这过滤下，input输入显示已过滤，但是angular还是会漏掉，在这再次过滤下
    self.query.EndpointID = self.query.EndpointID.replace(/[^0-9]+/,'');
    self.query.ApiID = self.query.ApiID.replace(/[^0-9]+/,'');
    if (parseInt(self.query.EndpointID) == 0 && self.query.EndpointID != '') {
      window.alert('路径编号需为大于0的正整数')
    }else {
      if (parseInt(self.query.ApiID) == 0 && self.query.ApiID != '') {
        window.alert('所属API ID需为大于0的正整数')
      }else {
        // 若有用户邮箱，转成用户id
        if(self.query.UserEmail == ''){
          self.query.UserId = ''
          self.tableParams.parameters({page : 1}).reload();
        }else{
          self.toID(self.query.UserEmail).then((result)=>{
            self.query.UserId = result
            self.tableParams.parameters({page : 1}).reload()
          })
        }
      }
    }
 }

 reset () {
   this.query.UserId = ''
   this.query.EndpointName = '';
   this.query.EndpointID = '';
   this.query.UriRoute = '';
   this.query.ApiID = '';
   this.query.ApiName = '';
   this.query.UserEmail = '';
   this.query.UserName = '';
   this.query.Status = '';
   this.query.page = 1;
   this.query.limit = 10;
   window.console.log(this.query);
 }
}
