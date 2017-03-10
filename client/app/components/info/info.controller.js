/**
 * (description)
 * 
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'

export default class InfoController {
    constructor($rootScope,$stateParams,NgTableParams) {
    	"ngInject";
    	this.$rootScope = $rootScope;
    	this.NgTableParams = NgTableParams;
    	this.apiid = $stateParams.ApiID
    	this.init();
	    this.data = {
	    	'total': 0,
	    	'datas': []	    	
	    };
	    this.infoContent = {
    		'ApiName': '',
    		'TargetBaseUri': '',
    		'Categories': '',
    		'ApiDesc': '',
    		'Logo':  ''
	    };
	}

	init(){
	  	let self = this;
	    self.tableParams = new this.NgTableParams({
	      page: 1,
	      count: 100
	    }, {
	    	counts: [],
	      	getData: function (params) {
	    		return commonSvc.getData({},'v1/uapi/info/' + self.apiid,1).then((res)=>{
		            if (res.status == 200) {	       		
			       		self.infoContent.ApiName = res.data.ApiName
			       		self.infoContent.TargetBaseUri = res.data.TargetBaseUri
			       		self.infoContent.Categories = res.data.Categories
			       		self.infoContent.ApiDesc = res.data.ApiDesc
			       		if(res.data.Logo == ''){
			       			self.infoContent.Logo = require('../../images/apiLogo.jpg')
			       		}else{
			       			self.infoContent.Logo = res.data.Logo
			       		}
			       		if(res.data.Endpoint && res.data.Endpoint.length > 0){
			       			for (let i = 0; i < res.data.Endpoint.length; i++) {
			       				res.data.Endpoint[i].GroupID = res.data.Group[res.data.Endpoint[i].GroupID]
					         	self.data.datas.push(res.data.Endpoint[i])       	
					        }
					       
					        self.data.total = res.data.Endpoint.length
			       		}
		               	return self.data
		            }else {
		               	window.alert(res.message);
		            }

		        }).then((result)=>{
		        	//self.loading && self.loading.close();
		            params.total(result.total);
		            return result.datas;
		        })
	    	}
	  	});
	}

	toEndpoint (row) {
		window.location.href = getDomain.getUrl('apiroute/' + row.EndpointID)
	}

	toReturn () {
		window.history.back()
	}
}