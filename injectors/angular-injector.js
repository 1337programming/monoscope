var angularInjector = module.exports = {};
var fs = require('fs');
var readline = require('readline');

angularInjector.inject = function (data) {

  var inject = this;

  inject.srcPath = {
    'model': '../public/templates/angular/module/module-config.js',
    'service': '../public/templates/angular/module/services/service.js',
    'directive': '../public/templates/angular/module/directives/directive.js',
    'controller': '../public/templates/angular/module/controllers/controller.js'
  };

  inject.data = data;

  function generateFile(savPath, srcPath, flag) {
    var rd = readline.createInterface({
      input: fs.createReadStream(srcPath),
      output: savPath,
      terminal: false
    });

    rd.on('line', function (line) {
      // Model injection
      if (flag === 'model') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', inject.data.appName);
          line.replace('moduleName', inject.data.moduleName);
        }
        if (line.indexOf('.state(') > -1) {
          line.replace('moduleState', inject.data.moduleState);
        }
        if (line.indexOf('url:') > -1) {
          line.replace('moduleUrl', inject.data.moduleUrl);
        }
        if (line.indexOf('templateUrl:') > -1) {
          line.replace('moduleUrl', inject.data.templateUrl);
        }
        if (line.indexOf('controller:') > -1) {
          line.replace('moduleCtr', inject.data.moduleCtr);
        }
      }

      // Service Injection
      if (flag === 'service') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', inject.data.appName);
          line.replace('moduleName', inject.data.moduleName);
        }
        if (line.indexOf('serviceName') > -1) {
          line.replace('serviceName', inject.data.serviceName);
          line.replace('args', inject.data.serviceArgs);
        }
      }

      // Directive Injection
      if (flag === 'directive') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', inject.data.appName);
          line.replace('moduleName', inject.data.moduleName);
        }
        if (line.indexOf('directiveName') > -1) {
          line.replace('directiveName', inject.data.directiveName);
          line.replace('args', inject.data.directiveArgs);
        }
      }
      // Controller Injection
      if (flag === 'controller') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', inject.data.appName);
          line.replace('moduleName', inject.data.moduleName);
        }
        if (line.indexOf('controllerName') > -1) {
          line.replace('controllerName', inject.data.controllerName);
          line.replace('args', inject.data.controllerArgs);
        }
      }
    });
  }

  function generateFiles() {
    generateFile(inject.data.savPath.model, inject.data.savPath.model, 'model');
    generateFile(inject.data.savPath.service, inject.data.savPath.service, 'service');
    generateFile(inject.data.savPath.directive, inject.data.savPath.directive, 'directive');
    generateFile(inject.data.savPath.controller, inject.data.savPath.controller, 'controller');
  }

  generateFiles();
};
