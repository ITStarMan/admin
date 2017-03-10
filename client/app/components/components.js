/**
 * components
 * @author name emailAddress
 */

import 'jquery';
import 'bootstrap';
import Service from '../service/service';
import NewDatetimepicker from './datetimepicker/index'

export default angular.module('app.components', [
  Service.name,
  NewDatetimepicker.name
]);

