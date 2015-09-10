var angularInjector = module.exports = {};
var fs = require('fs');
var readline = require('readline');

angularInjector.inject = function (data) {

  this.srcPath = {
    'model': '../public/templates/angular/module/module-config.js',
    'service': '../public/templates/angular/module/services/service.js',
    'directive': '../public/templates/angular/module/directives/directive.js',
    'controller': '../public/templates/angular/module/controllers/controller.js'
  };
  this.data = data;

  function generateFiles() {
    generateFile(this.data.savPath.model, this.data.savPath.model, 'model');
    generateFile(this.data.savPath.service, this.data.savPath.service, 'service');
    generateFile(this.data.savPath.directive, this.data.savPath.directive, 'directive');
    generateFile(this.data.savPath.controller, this.data.savPath.controller, 'controller');

  }

  function generateFile(savPath, srcPath, flag) {
    var rd = readline.createInterface({
      input: fs.createReadStream(srcPath),
      output: this.data.savPath,
      terminal: false
    });

    rd.on('line', function (line) {
      // Model injection
      if (flag === 'model') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', this.data.appName);
          line.replace('moduleName', this.data.moduleName);
        }
        if (line.indexOf('.state(') > -1) {
          line.replace('moduleState', this.data.moduleState);
        }
        if (line.indexOf('url:') > -1) {
          line.replace('moduleUrl', this.data.moduleUrl);
        }
        if (line.indexOf('templateUrl:') > -1) {
          line.replace('moduleUrl', this.data.templateUrl);
        }
        if (line.indexOf('controller:') > -1) {
          line.replace('moduleCtr', this.data.moduleCtr);
        }
      }

      // Service Injection
      if (flag === 'service') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', this.data.appName);
          line.replace('moduleName', this.data.moduleName);
        }
        if (line.indexOf('serviceName') > -1) {
          line.replace('serviceName', this.data.serviceName);
          line.replace('args', this.data.serviceArgs);
        }
      }

      // Directive Injection
      if (flag === 'directive') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', this.data.appName);
          line.replace('moduleName', this.data.moduleName);
        }
        if (line.indexOf('directiveName') > -1) {
          line.replace('directiveName', this.data.directiveName);
          line.replace('args', this.data.directiveArgs);
        }
      }
      // Controller Injection
      if (flag === 'controller') {
        if (line.indexOf('angular.module') > -1) {
          line.replace('App', this.data.appName);
          line.replace('moduleName', this.data.moduleName);
        }
        if (line.indexOf('controllerName') > -1) {
          line.replace('controllerName', this.data.controllerName);
          line.replace('args', this.data.controllerArgs);
        }
      }
    });
  }
};
