'use strict';

angular.module('App.moduleName')
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('moduleState', {
        url: '/moduleUrl',
        templateUrl: 'moduleUrl',
        controller: 'moduleCtr'
      });

    $urlRouterProvider.otherwise('/');

  });