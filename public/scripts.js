var socket = io();
socket.emit('connected', 'Connected!');
var module = {};
module.controller = function() {
	shortcuts.map(function(shortcut) {
		shortcut.modal = {};
		shortcut.modal.visible = m.prop(false);
		shortcut.modal.view = function() {
			if (shortcut.modal.visible()) {
				return m('.modal', [
					m('p', JSON.stringify(shortcut, null, 4)),
					m('button', {onclick: shortcut.modal.visible.bind(this, false)}, 'Close')
				]);
			}
			else {
				return '';
			}
		};
	});
};
module.view = function(vm) {
	return [
		m('.shortcut-container', [
			shortcuts.map(function(shortcut) {
				return m('button.monobutton', {onclick: shortcut.modal.visible.bind(this, true)}, shortcut.name);	
			})
		]),
		shortcuts.map(function(shortcut) {
			return shortcut.modal.view();
		})
	];
};
m.module(document.getElementById('nav'), module)
