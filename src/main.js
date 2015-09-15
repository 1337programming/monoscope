var main = module.exports = {};
var m = require('mithril');

var module = {
    controller: require('./navbar-controller'),
    view: require('./navbar-view')
};
m.module(document.getElementById('nav'), module)
