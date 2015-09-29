var m = require('mithril');

module.exports = function(vm) {
    function openShortcut(shortcut, that) {
        var bindOpen = shortcut.modal.visible.bind(that, true);
        return function(e) {
            //Run shortcut if no form is specified.
            if (shortcut.form.length === 0) {
                vm.submit(shortcut)(e);
            }
            else {
                console.log('called!!!', shortcut);
                bindOpen();
            }
        };
    };
    return [
        m('.shortcut-container', [
            vm.shortcuts().map(function(shortcut) {
                return m('button.monobutton', {
                    onclick: openShortcut(shortcut, this)
                }, shortcut.name);
            })
        ]),
        vm.shortcuts().map(function(shortcut) {
            return shortcut.modal.view();
        })
    ];
};
