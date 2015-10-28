var socket = require('./socket');
var m = require('mithril');
var inputs = require('./inputs');

module.exports = function() {
    var vm = this;
    vm.submit = function(shortcut) {
        return function(e) {
            socket.emit('shortcut', shortcut);
            shortcut.modal.visible(false);
            e.preventDefault();
        };
    };

    vm.shortcuts = m.prop(window.shortcuts);
    vm.shortcuts().map(function(shortcut) {
        shortcut.modal = {};
        shortcut.form = shortcut.form || [];
        shortcut.form.map(function(field) {
            field.value = m.prop(field.default || '');
        });
    });
};
