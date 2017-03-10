/**
 * (description)
 * 
 * @author duanchao5
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'
import $ from 'jquery'

export default class ApiController {
    constructor($scope,NgTableParams,LoadingService) {
    	"ngInject";
  		this.NgTableParams = NgTableParams;
  		this.$scope = $scope;
  		this.LoadingService = LoadingService;
  		this.loading = '';
  		this.init();
	    this.queryData = {
	    	apiName : '',
		    startTime: '',
		    endTime: '',
		    status : '',
		    devId : ''
	    };
	    this.sendParams = {
	    	apiName : '',
		    startTime: '',
		    endTime: '',
		    status : '',
		    devId : ''
	    };
	    this.loadPromise = {
	    	'total': 0,
	    	'datas': []
	    }
	}

	init(){
	  	let self = this;
	    self.tableParams = new this.NgTableParams({
	      page: 1,
	      count: 10
	    }, {
	    	counts: [10,20,30],
	      	getData: function (params) {
	      		/*self.loading = self.LoadingService.loading({
			      target: '.table-container',
			      text: 'loading...'
			    })*/
				$('body').animate( {scrollTop: 0}, 0)
				$('.main-content').animate( {scrollTop: 0}, 0)
	      		let postParams = self.formatSearchObj(params)
	    		return commonSvc.getData(postParams,'v1/uapi/all',1).then((res)=>{
		            if (res.status == 200) {
		            	if(res.data.Apis && res.data.Apis.length>0){
			       			for (let i = 0; i < res.data.Apis.length; i++) {
			       				if(res.data.Apis[i].Status == 2){
			       					res.data.Apis[i].Status = '已发布'
			       				}else{
			       					res.data.Apis[i].Status = '未发布'
			       				}
			       				res.data.Apis[i].price = '免费'
			       				res.data.Apis[i].UserName = res.data.UsersInfo[res.data.Apis[i].UserID].nick
			       				res.data.Apis[i].UserEmail = res.data.UsersInfo[res.data.Apis[i].UserID].email
			       				//res.data.Apis[i].CreateTime = self.changeDate(res.data.Apis[i].CreateTime)
			       			}
			       		}
			       		self.loadPromise.total = res._metadata.Total
		               	return res
		            }else if(res.status == 500){
		               	window.alert('搜索条件有误，请重新搜索！')
		               	self.reset()
		            }else{
		            	window.alert(res.message);
		            }

		        }).then((result)=>{
		        	//self.loading && self.loading.close();
		            console.log(result._metadata.Total)
		            params.total(result._metadata.Total);
		            return result.data.Apis;
		        })
	    	}
	  	});
	}

	changeDate (params) {
		let date = params.slice(0,10)
		let minute = params.slice(13,19)
		let time = params.slice(11,13)
		time = parseInt(time) + parseInt(8)
		if(time>=24){
			time = parseInt(time) - parseInt(24)
			let year = date.slice()
		}
		time = time.toString()
		if(time.length == 1){
			time = '0' + time
		}
		return date + ' ' + time + minute
	}

	sendQuery () {
		this.sendParams.apiName = this.queryData.apiName
		this.sendParams.startTime = this.queryData.startTime
		this.sendParams.endTime = this.queryData.endTime
		this.sendParams.status = this.queryData.status
		this.sendParams.devId = this.queryData.devId
		if(this.sendParams.devId == ''){
			this.tableParams.parameters({page : 1}).reload()
		}else{
			this.toID(this.sendParams.devId).then((result)=>{
				this.sendParams.devId = result
				this.tableParams.parameters({page : 1}).reload()
			})
		}
	}

	toID (email) {
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
				window.alert('搜索条件有误，请重新搜索！')
				self.reset()
			}
		}).then((result)=>{
			return result
		})
	}

	formatSearchObj (params) {
		if(this.sendParams.startTime !== '' && this.sendParams.endTime == ''){
			this.sendParams.endTime = '2100-01-01 01:01:01'
		}
		if(this.sendParams.endTime !== '' && this.sendParams.startTime == ''){
			this.sendParams.startTime = '2000-01-01 01:01:01'
		}
		let ctime = this.sendParams.startTime + '||' + this.sendParams.endTime
		if(this.sendParams.startTime == '' && this.sendParams.endTime == ''){
			ctime = ''
		}
		let limit = parseInt(params.url().count);
		let offset = (parseInt(params.url().page) - 1) * limit;
		let sendData = {
			'ApiName': this.sendParams.apiName,
			'CreateTime': ctime,
			'Status': this.sendParams.status,
			'UserID': this.sendParams.devId,
			'limit': limit,
			'offset': offset
		}
		return sendData
	}

	reset () {
		this.queryData = {
	    	apiName : '',
		    startTime: '',
		    endTime: '',
		    status : '',
		    devId : ''
	    };
	}

	toInfo (row) {
		window.location.href = getDomain.getUrl('apidetail/' + row.ApiID)
	}

	toData (row) {
		window.location.href = getDomain.getUrl('apidata/' + row.ApiID)
	}
}