var socket = require('./socket');
var m = require('mithril');
var inputs = require('./inputs');

module.exports = function() {
    var vm = this;
    var submit = function(shortcut) {
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
        var id = 0;
        shortcut.form.map(function(field) {
            field.value = m.prop(field.default || '');
            field.id = id++;
        });
        shortcut.modal.visible = m.prop(false);
        shortcut.modal.view = function() {
            if (!shortcut.modal.visible()) {
                return '';
            }
            return m('#modal.modal-wrapper', [
                m('.modal-container', [
                    m('form.modal-form', {
                        onsubmit: submit(shortcut)
                    }, [
                        m('h2', shortcut.name),
                        shortcut.form.map(function(field) {
                            return m('.group', [
                                m('label[for=' + field.id + ']', field.label),
                                m('br'),
                                inputs.createInput(field),
                                m('hr')
                            ]);
                        }),
                        m('.input-group', [
                            m('p', [
                                m('input[type=submit]', {
                                    onclick: submit(shortcut),
                                    value: 'Create'
                                })
                            ])
                        ])
                    ]),
                    m('button.modal-close', {
                        onclick: shortcut.modal.visible.bind(this, false)
                    }, 'X')
                ])
            ]);
        };
    });
};
