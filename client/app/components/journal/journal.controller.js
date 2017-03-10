/**
 * (description)
 *
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'

export default class JournalController {
  constructor($timeout, $rootScope, NgTableParams) {
    'ngInject';
    this.name = '日志管理';
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.NgTableParams = NgTableParams;
    this.init();
    this.loadPromise = {
      'total': 0,
      'datas': [ ]
    };


    this.queryData = {
      OperatorEmail: '',
      LogID : '',
      startTime: '',
      endTime: '',
      OperatorTime: '',     // 要求是 2017-01-11 10:11:33||2017-02-11 10:11:33 格式
      TableID: '',
      Action: '0',
      OperatorId : '',
      OperatorName : '',
      limit : 20,   // 每页加载多少
      offset : 0    // 数据起始位置，注意是数据条起始位置
    };
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
       // $('body').animate( {scrollTop: 0}, 0);
       // $('.main-content').animate( {scrollTop: 0}, 0);
       self.queryData.limit = parseInt(params.url().count);
   		 self.queryData.offset = (parseInt(params.url().page) - 1) * self.queryData.limit;
       // 把起始时间转化下
       if (self.queryData.startTime != '' && self.queryData.endTime != '') {
         // 根据接口要求，把起始时间拼装
         self.queryData.OperatorTime = self.queryData.startTime + "||" + self.queryData.endTime
       }
       if (self.queryData.startTime != '' && self.queryData.endTime == '') {
         // 根据接口要求，把起始时间拼装，没有截止时间，就最大时间
         self.queryData.OperatorTime = self.queryData.startTime + "||" + '2100-01-01 01:01:01'
       }
       if (self.queryData.startTime == '' && self.queryData.endTime != '') {
         // 根据接口要求，把起始时间拼装，没有截止时间，就最大时间
         self.queryData.OperatorTime = '2001-01-01 01:01:01'+ "||" + self.queryData.endTime
       }
         return commonSvc.getData(self.queryData,'v1/oplog',1).then((res)=>{
          //  this.$timeout(() => {
          //  }, 1);
           if (res.status == 200) {
             // 防止报错
             self.loadPromise.datas = res.data.Logs == null ? [] : res.data.Logs;
             // 总共多少条数据
            self.loadPromise.total = res._metadata.Total;
            let temp = res
            temp.data.Logs = res.data.Logs == null ? [] : res.data.Logs
            for (let i = 0; i < temp.data.Logs.length; i++) {
              try {
                temp.data.Logs[i].UserEmail = temp.data.UsersInfo[temp.data.Logs[i].OperatorId].email
              } catch (e) {
                window.console.log(e);
              } finally {

              }
              try {
                temp.data.Logs[i].OperatorName = temp.data.UsersInfo[temp.data.Logs[i].OperatorId].nick
              } catch (e) {
                window.console.log(e);
              } finally {

              }
            }
            window.console.log(temp);
            return temp;
           }else {
             window.alert(res.message);
           }
         }).then((result)=>{
             //self.loading && self.loading.close();
               params.total(result._metadata.Total);
               return result.data.Logs;
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
lookup(row){
  // 跳转到对应日志详情页
  window.location.href = getDomain.getUrl('journaldetail/' + row.LogId);
}

 submit () {
   let _this = this
   // 有些字段必须为数字，input已过率，但是angular会有漏掉，在这过滤下，
   _this.queryData.LogID = _this.queryData.LogID.replace(/[^0-9]+/,'');
   _this.queryData.TableID = _this.queryData.TableID.replace(/[^0-9]+/,'');
   if (parseInt(_this.queryData.LogID) == 0 && _this.queryData.LogID != '') {
     window.alert('日志ID需为大于0的正整数')
   }else {
     if (parseInt(_this.queryData.TableID) == 0 && _this.queryData.TableID != '') {
       window.alert('对象ID需为大于0的正整数')
     }else {
         // 若有用户邮箱，转成用户id
         if(_this.queryData.OperatorEmail == ''){
           _this.queryData.OperatorId = '';
           _this.tableParams.parameters({page : 1}).reload();
         }else{
           _this.toID(_this.queryData.OperatorEmail).then((result)=>{
             _this.queryData.OperatorId = result
             _this.tableParams.parameters({page : 1}).reload()
           })
         }
     }
   }
 }

 reset () {
   // 清空查询条件
   let self = this;
   self.queryData.LogID = '';
   self.queryData.startTime = '';
   self.queryData.endTime = '';
   self.queryData.TableID = '';
   self.queryData.Action = '0';
   self.queryData.OperatorId = '';
   self.queryData.OperatorName = '';
   self.queryData.OperatorTime = '';
   self.queryData.OperatorEmail = '';
 }
}
