/**
 * (description)
 * 
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'
import $ from 'jquery'

export default class SubscribeController {
    constructor(NgTableParams,$scope) {
    	"ngInject";
    	this.$scope = $scope
	    this.queryData = {
	    	apiName: '',
	    	startTime: '',
	    	endTime: '',
	    	apiId: '',
	    	devId: '',
	    	subId: ''
	    };
	    this.sendParams = {
	    	apiName: '',
	    	startTime: '',
	    	endTime: '',
	    	apiId: '',
	    	devId: '',
	    	subId: ''
	    };
	    this.NgTableParams = NgTableParams;
		this.data = {
		    "total": 0,
		    "datas": []
		};
		this.init();   
	}

	init(){
	    let self = this;
	    self.tableParams = new this.NgTableParams({
	      	page: 1,
	      	count: 10
	    }, {
	    	counts: [10,20,30],
	      	getData: function (params) {
	      		$('body').animate( {scrollTop: 0}, 0)
				$('.main-content').animate( {scrollTop: 0}, 0)
	      		let postParams = self.formatSearchObj(params)
	      		console.log(postParams)
	      		return commonSvc.getData(postParams,'v1/sub/admin',1).then((res)=>{	    	
			        if (res.status == 200) {
			        	let dataGroup = {
			        		total: res._metadata.Total,
			        		datas: []
			        	}
			        	for(let i=0;i<res.data.subIds.length;i++){
			        		let devData = {
			        			'ApiName': res.data.subMaps[res.data.subIds[i]].ApiName,
			        			'ApiID': res.data.subMaps[res.data.subIds[i]].ApiID,
			        			'SubscriborName': res.data.subMaps[res.data.subIds[i]].SubscriborName,
			        			'SubscriborEmail': res.data.subMaps[res.data.subIds[i]].SubscriborEmail,
			        			'OwnerID': res.data.subMaps[res.data.subIds[i]].OwnerID,
			        			'OwnerName': res.data.subMaps[res.data.subIds[i]].OwnerName,
			        			'OwnerEmail': res.data.subMaps[res.data.subIds[i]].OwnerEmail,
			        			'CreateTime': res.data.subMaps[res.data.subIds[i]].CreateTime
			        		}
			        		dataGroup.datas[i] = devData
			        	}
			        	console.log(dataGroup)
			        	self.data = dataGroup
			        	return dataGroup
			        }else if(res.status == 500){
			        	window.alert('搜索条件有误，请重新搜索！')
			        	self.reset()
			    	}else {
			       		window.alert(res.message);
			     	}
			   	}).then((result)=>{
			   		params.total(result.total);
		      		return result.datas;
			   	})	      	
	    	}
		})
	}

	formatSearchObj (params) {
		let limit = parseInt(params.url().count);
		let offset = (parseInt(params.url().page) - 1) * limit;
		let sendData = {
			'apiName': this.sendParams.apiName,
			'subTimeBegin': this.sendParams.startTime,
			'subTimeEnd': this.sendParams.endTime,
			'apiID': this.sendParams.apiId.replace(/[^0-9]+/,''),
			'ownerID': this.sendParams.devId,
			'subscriborID': this.sendParams.subId,
			'limit': limit,
			'offset': offset
		}
		return sendData
	}

	sendQuery () {
		this.sendParams.apiName = this.queryData.apiName
		this.sendParams.startTime = this.queryData.startTime
		this.sendParams.endTime = this.queryData.endTime
		this.sendParams.apiId = this.queryData.apiId
		this.sendParams.devId = this.queryData.devId
		this.sendParams.subId = this.queryData.subId
		if(this.sendParams.devId !== '' || this.sendParams.subId !== ''){
			if(this.sendParams.devId !== '' && this.sendParams.subId == ''){
				this.toID(this.sendParams.devId).then((result)=>{
					this.sendParams.devId = result
					console.log(this.sendParams.devId)
					this.tableParams.parameters({page : 1}).reload()
				})
			}else if(this.sendParams.devId == '' && this.sendParams.subId !== ''){
				this.toID(this.sendParams.subId).then((result)=>{
					this.sendParams.subId = result
					console.log(this.sendParams.subId)
					this.tableParams.parameters({page : 1}).reload()
				})
			}else if(this.sendParams.devId !== '' && this.sendParams.subId !== ''){
				this.toTwoID(this.sendParams.devId,this.sendParams.subId).then((result)=>{
					this.sendParams.devId = result.dev
					this.sendParams.subId = result.sub
					console.log(this.sendParams.devId)
					console.log(this.sendParams.subId)
					this.tableParams.parameters({page : 1}).reload()
				})
			}
		}else{
			this.tableParams.parameters({page : 1}).reload();
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

	toTwoID (dmail,smail) {
		let postParams = {
			'emails': dmail + ',' + smail
		}
		let self = this
		return commonSvc.getData(postParams,'passport/account-uids.json',4).then((res)=>{
			if(res && res.status == 200){
				let rdata = {
					dev: '',
					sub: ''
				}
				if(res.attachment[dmail]){
					rdata.dev = res.attachment[dmail]
				}else{
					rdata.dev = -1
				}
				if(res.attachment[smail]){
					rdata.sub = res.attachment[smail]
				}else{
					rdata.sub = -1
				}
				return rdata
			}else{
				window.alert('搜索条件有误，请重新搜索！')
				self.reset()
			}
		}).then((result)=>{
			return result
		})
	}

	reset () {
		this.queryData = {
	    	apiName: '',
	    	startTime: '',
	    	endTime: '',
	    	apiId: '',
	    	devId: '',
	    	subId: ''
	    }
	}
}