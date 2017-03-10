/**
 * (description)
 *
 * @author yourname
 */
 import commonSvc from '../../service/commonSvc.js'
 import getDomain from '../../service/getDomain.js'

export default class DeveloperinfoController {
  constructor($state, $rootScope) {
    'ngInject';
    this.name = '查看开发者';
    this.state= $state;    // 获取url参数
    this.$rootScope = $rootScope;
    this.developerinfo = {
    };
    // 加载数据
    this.loadData();
  }

  loadData ( ) {
    let self = this
    commonSvc.postJson({
      "query": {
        "bool": {
           "must": [ {
             "match_phrase": {
               "email":  self.state.params.email
             }
           }]
        }
      },
     "size": 20,
     "from": 0
    }, 'passport/user/_search' , 2, null).then((res)=>{
      self.developerinfo = res.hits.hits[0];
      self.$rootScope.$apply();
    })
  }
   goBack () {
     // 返回列表查询也
     window.location.href = getDomain.getUrl('developer');
   }
}
