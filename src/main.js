var main = module.exports = {};
var m = require('mithril');
window.jQuery = require('jquery'); //Required by bootstrap
var bootstrap = require('bootstrap');
require('./main.scss')
var module = {
  controller: require('./navbar-controller'),
  view: require('./navbar-view')
};
m.module(document.getElementById('app'), module)
