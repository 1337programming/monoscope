var m = require('mithril');

module.exports = function(vm) {
    return [
        m('.shortcut-container', [
            vm.shortcuts().map(function(shortcut) {
                return m('button.monobutton', {
                    onclick: shortcut.modal.visible.bind(this, true)
                }, shortcut.name);
            })
        ]),
        vm.shortcuts().map(function(shortcut) {
            return shortcut.modal.view();
        })
    ];
};
