/**
 * (description)
 * 
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'

export default class EndpointinfoController {
    constructor($rootScope,$stateParams) {
    	"ngInject";
    	this.$rootScope = $rootScope;
    	this.route = {
    		EndpointName: '',
    		UriRoute: '',
    		Method: '',
    		EndpointDesc: ''
    	};
    	this.urldata = [];
    	this.headerdata = [];
    	this.endpointid = $stateParams.endpointid
	    this.info()
	}

	pageChange(pageNo) {
	    console.log(pageNo)
	}

	info () {
	    commonSvc.getData({},'v1/endpoint/' + this.endpointid,1).then((res)=>{
	        if (res.status == 200) {
	       		this.route.EndpointName = res.data.EndpointName
	       		this.route.UriRoute = res.data.UriRoute
	       		this.route.Method = res.data.Method
	       		this.route.EndpointDesc = res.data.EndpointDesc
	       		if(res.data.FormParam && res.data.FormParam.length > 0){
	       			for (let i = 0; i < res.data.FormParam.length; i++) {			         	
			         	if(res.data.FormParam[i].ParamType == 1){
			         		res.data.FormParam[i].ParamType = 'String'
			         	}else if(res.data.FormParam[i].ParamType == 2){
			         		res.data.FormParam[i].ParamType = 'Number'
			         	}else{
			         		res.data.FormParam[i].ParamType = 'Boolean'
			         	}
			         	if(res.data.FormParam[i].Condition == 1){
			         		res.data.FormParam[i].Condition = '必选'
			         	}else if(res.data.FormParam[i].Condition == 2){
			         		res.data.FormParam[i].Condition = '可选'
			         	}else{
			         		res.data.FormParam[i].Condition = '常量'
			         	}		         	
			        }
			        this.urldata = res.data.FormParam
	       		}
	       		if(res.data.HeaderParam && res.data.HeaderParam.length > 0){
	       			for (let i = 0; i < res.data.HeaderParam.length; i++) {
			         	if(res.data.HeaderParam[i].ParamType == 1){
			         		res.data.HeaderParam[i].ParamType = 'String'
			         	}else if(res.data.HeaderParam[i].ParamType == 2){
			         		res.data.HeaderParam[i].ParamType = 'Number'
			         	}else{
			         		res.data.HeaderParam[i].ParamType = 'Boolean'
			         	}
			         	if(res.data.HeaderParam[i].Condition == 1){
			         		res.data.HeaderParam[i].Condition = '必选'
			         	}else if(res.data.HeaderParam[i].Condition == 2){
			         		res.data.HeaderParam[i].Condition = '可选'
			         	}else{
			         		res.data.HeaderParam[i].Condition = '常量'
			         	}
			        }
			        this.headerdata = res.data.HeaderParam
	       		}       		
	       		this.$rootScope.$apply()
	        }else {
	       		window.alert(res.message);
	     	}
	   	})
	}

	toReturn () {
		window.history.back()
	}
}