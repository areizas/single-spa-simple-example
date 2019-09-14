import angular from 'angular';
import './root.component.js';
import './controller/login.component.js'

angular
.module('user-app')
.config(($stateProvider, $locationProvider) => {

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  $stateProvider
    .state('root', {
      url: '/user',
      template: '<root />',
    })

  $stateProvider
    .state('root.login', {
      url: '/login',
      template: '<login />',
    })

});