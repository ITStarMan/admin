/**
 * (description)
 *
 * @author yourname
 */
import getDomain from '../../service/getDomain.js'

export default class DashboardController {
  constructor($sce) {
  	"ngInject";
    this.name = 'DASHBOARD';
    this.$sce = $sce;
    this.p1 = '';
    this.p5 = '';
    this.p9 = '';
    this.p3 = '';
    this.init();
  }

  init () {
	this.p1 = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-platform?panelId=1'))
	this.p5 = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-platform?panelId=5'))
	this.p9 = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-platform?panelId=9'))
	this.p3 = this.$sce.trustAsResourceUrl(getDomain.getDashborad('dashboard-solo/db/for-platform?panelId=3'))
  }

}
