/**
 * (description)
 *
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'

export default class EndpointdetailController {
  constructor($state, $rootScope) {
    'ngInject';
    this.name = '路径详情';
    this.state= $state;    // 获取url参数
    this.$rootScope = $rootScope;
    this.enpointDetail = {
        'EndpointName': ''
    };
    this.APIdetail = {
    };

    // 加载数据
    this.loadData();
  }

  loadData () {
    let self = this
    commonSvc.getData({}, 'v1/endpoint/admin/' + self.state.params.id, 1).then((res)=>{
      if (res.status == 200) {
        self.enpointDetail = res.data.endpoint
        self.APIdetail = res.data.uapi
        self.$rootScope.$apply();
      } else {
        window.alert(res.message)
      }
    })
  }

  goBack () {
    // 返回列表查询也
    window.location.href = getDomain.getUrl('endpoint');
  }
}
