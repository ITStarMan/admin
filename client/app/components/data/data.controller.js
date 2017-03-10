/**
 * (description)
 * 
 * @author yourname
 */
import commonSvc from '../../service/commonSvc.js'
import getDomain from '../../service/getDomain.js'
import $ from 'jquery'

export default class DataController {
  constructor($sce,$stateParams) {
    "ngInject";
    this.$sce = $sce
    this.apiid = $stateParams.ApiID
    this.status = '';
    this.request = '';
    this.mean = "";
    this.init();
  }

  init () {
  		this.status = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-api?var-apiId='+ this.apiid + '&panelId=4'))
  		this.request = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-api?var-apiId='+ this.apiid + '&panelId=2'))
  		this.mean = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-api?var-apiId='+ this.apiid + '&panelId=11'))
  }

  toReturn () {
    window.history.back()
  }
}