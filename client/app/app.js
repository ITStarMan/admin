/**
 * bp admin entry
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import router from './router/router';
import './skin/theme.less';
import {Button} from 'fancyui';
import {CustomTable} from 'fancyui';
import { ffanTable } from 'fancyui';

angular.module('app', [
    router.name,
    Common.name,
    Components.name,
    Button.name,
    CustomTable.name,
    ffanTable.name
  ])
  .constant('$menuConstant', {
    DEBUG: process.env.DEBUG
  })
  .component('app', AppComponent);

  console.log('process.env.DEBUG', process.env.DEBUG);
