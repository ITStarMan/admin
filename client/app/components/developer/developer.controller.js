/**
 * (description)
 *
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'
import $ from 'jquery'
export default class DeveloperController {
  constructor($rootScope, NgTableParams) {
    'ngInject';
    this.name = '开发者管理';
    this.$rootScope = $rootScope;
    this.NgTableParams = NgTableParams;
    this.query = {
      size : 10,     // 每页多少条数据
      from : 0,     // 从第几条开始
      q : ''      // 由于查询参数传输方式/user/_search?q=nick:zhangcong123&email:zhangcong1231@qq.com
    }
    this.userName = '';    // 查询条件 - 用户名
    this.email = '';      // 查询条件 - 邮箱
    this.phone = '';      // 查询条件 - 手机号
    this.status = '';  // 查询条件 - 开发者状态
    this.totalCount = 0;   // 表格条数不好使，暂时自己做一个变量
    this.loadPromise = {
      'total': 0,
      'datas': [ ]
    }
    this.init();
  }

  init(){
      let self = this;
      self.tableParams = new this.NgTableParams({
        page: 1,
        count: 20
      }, {
        counts: [10,20,30],
          getData: function (params) {
            /*self.loading = self.LoadingService.loading({
            target: '.table-container',
            text: 'loading...'
          })*/
        $('body').animate( {scrollTop: 0}, 0)
        $('.main-content').animate( {scrollTop: 0}, 0)
        // 查询数据包装
        let searchParam = {
          "query": {
            "bool": {
               "must": [],
               "should": [],
               "minimum_should_match": 1
            }
          },
          "sort":[
              {"_score":"desc"},
              {"createtime":"desc"}
          ],
         "size": 0,
         "from": 0
        }
        self.userName = self.userName.trim();   // 去掉前后空格
        if (self.userName != '') {
          // 昵称中英文不同
          let checkRlue = /^[a-zA-Z0-9]+$/
          if (checkRlue.test(self.userName)) {
            let tempNick = {
              "wildcard": {
                "nick":  '*' + self.userName + '*'
              }
            }
            searchParam.query.bool.must.push(tempNick)
          }else {
            let tempNick = {
              "match": {
                "nick": self.userName
              }
            }
            searchParam.query.bool.must.push(tempNick)
          }

        }
        if (self.email != '') {
          let tempEmail = {
            "match_phrase": {
              "email":  self.email
            }
          }
          searchParam.query.bool.must.push(tempEmail)
        }
        if (self.status != '') {
          // 0和1都代表正常
          if (self.status == '0') {
            let tempStatus1 = {
              "term": {
                "status": 0
              }
            }
            searchParam.query.bool.should.push(tempStatus1)
            let tempStatus2 = {
              "term": {
                "status": 1
              }
            }
            searchParam.query.bool.should.push(tempStatus2)
          } else {
            let tempStatus = {
              "term": {
                "status":  parseInt(self.status)
              }
            }
            searchParam.query.bool.should.push(tempStatus)
          }
        }else {
          let tempStatus1 = {
            "term": {
              "status": 0
            }
          }
          searchParam.query.bool.should.push(tempStatus1)
          let tempStatus2 = {
            "term": {
              "status": 1
            }
          }
          searchParam.query.bool.should.push(tempStatus2)
          let tempStatus3 = {
            "term": {
              "status": 2
            }
          }
          searchParam.query.bool.should.push(tempStatus3)
        }
        searchParam.size = parseInt(params.url().count);
        searchParam.from = (parseInt(params.url().page) - 1) * (searchParam.size);
        // searchParam.query = JSON.stringify(searchParam.query)
          return commonSvc.postJson(searchParam, 'passport/user/_search', 2).then((result)=>{
             self.loadPromise.datas = result.hits.hits;
             let temp = result
             // 时间转化成2017-03-01格式
             for (let i = 0; i < temp.hits.hits.length; i++) {
               let tempDate = new Date(temp.hits.hits[i]._source.createtime);
               let date = tempDate.getFullYear()+"-";
               if ((tempDate.getMonth()+1) <= 9) {
                 date = date + '0' +(tempDate.getMonth()+1) + '-';
               }else {
                 date = date  + (tempDate.getMonth()+1) + "-";
               }
               if (tempDate.getDate() <= 9) {
                 date = date + '0' +tempDate.getDate();
               }else {
                  date = date  + tempDate.getDate();
               }
               temp.hits.hits[i]._source.createtime = date;
             }
             return temp;
          }).then((res)=>{
              //self.loading && self.loading.close();
                self.totalCount = res.hits.total;  // 表格条数不好使，暂时自己做一个变量
                params.total(res.hits.total);
                return res.hits.hits;
            })
        }
      });
  }

 submit () {
   this.tableParams.parameters({page : 1}).reload();
 }

 reset () {
   this.userName = '';    // 查询条件 - 用户名
   this.email = '';      // 查询条件 - 邮箱
   this.phone = '';      // 查询条件 - 手机号
   this.status = '';  // 查询条件 - 开发者状态
 }

 checkData (rule, data) {
   if (rule.test(data)) {
     return true
   } else {
     return false
   }
 }

 unfreeze (row) {
   // 解除冻结
   let self = this
   switch (row._source.status) {
     case 0:
      // 冻结操作
      commonSvc.getData({uid:row._id}, 'passport/account-reject.json' , 4).then((res)=>{
        if(res.status == 200){
        row._source.status = 2;
        self.$rootScope.$apply();
          window.alert('冻结成功')
        } else {
          window.alert('冻结失败')
        }
      })
       break;
     case 1:
     // 冻结操作
     commonSvc.getData({uid:row._id}, 'passport/account-reject.json' , 4).then((res)=>{
       if(res.status == 200){
       row._source.status = 2;
       self.$rootScope.$apply();
         window.alert('冻结成功')
       } else {
         window.alert('冻结失败')
       }
     })
      break;
      case 2:
       // 解除冻结操作
       commonSvc.getData({uid:row._id}, 'passport/account-accept.json' , 4).then((res)=>{
         if(res.status == 200){
         row._source.status = 1;
         self.$rootScope.$apply();
           window.alert('解冻成功')
         } else {
           window.alert('解冻失败')
         }
       })
       break;
     default:

   }
 }

 lookup (row) {
   // 查看详情
   window.location.href = getDomain.getUrl('developerinfo/' + row._source.email);
 }
}
