/**
 * (description)
 *
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'
export default class JournaldetailController {
  constructor($state, $rootScope) {
    'ngInject';
    this.name = '日志详情';
    this.$rootScope = $rootScope;
    this.state= $state;    // 获取url参数
    this.jourDetail = {
      LogId : '',
      OperatorTime : '',
      Table : '',
      TableId : '',
      Action : '',
      Contents : '',
      OperatorId : '',
      OperatorName : '',
      OperatorEmail : ''
    }
    // 加载日志详情
    this.loadData($state.params.id);
  }

  loadData (jourID) {
    let self = this
    commonSvc.getData({}, '/v1/oplog/' + jourID, 1).then((res)=>{
      if (res.status == 200) {
        window.console.log(res);
        self.jourDetail = res.data.Oplog;
        self.jourDetail.OperatorName = res.data.UsersInfo[res.data.Oplog.OperatorId].nick;
        self.jourDetail.OperatorEmail = res.data.UsersInfo[res.data.Oplog.OperatorId].email;
        // 时间转化成2017-03-01 09：35：11格式
        let tempDate = new Date(res.data.Oplog.OperatorTime);
        let date = tempDate.getFullYear()+"-";
        if ((tempDate.getMonth()+1) <= 9) {
          date = date + '0' +(tempDate.getMonth()+1) + '-';
        }else {
          date = date  + (tempDate.getMonth()+1) + "-";
        }
        if (tempDate.getDate() <= 9) {
          date = date + '0' +tempDate.getDate() + ' ';
        }else {
           date = date  + tempDate.getDate() + ' ';
        }
        if (tempDate.getHours() <= 9) {
          date = date + '0' +tempDate.getHours() + ':';
        }else {
           date = date  + tempDate.getHours() + ':';
        }
        if (tempDate.getDate() <= 9) {
          date = date + '0' +tempDate.getMinutes() + ':';
        }else {
           date = date  + tempDate.getMinutes() + ':';
        }
        if (tempDate.getDate() <= 9) {
          date = date + '0' +tempDate.getSeconds();
        }else {
           date = date  + tempDate.getSeconds();
        }
        self.jourDetail.OperatorTime = date
        self.$rootScope.$apply();
      } else {
        window.alert(res.message);
      }
    });
  }

  goBack () {
    // 返回列表查询也
    window.location.href = getDomain.getUrl('journal');
  }
}
