var socket = io();
socket.emit('connected', 'Connected!');
var module = {};
module.controller = function () {
  shortcuts.map(function (shortcut) {
    shortcut.modal = {};
    shortcut.modal.visible = m.prop(false);
    shortcut.modal.view = function () {
      if (shortcut.modal.visible()) {
        return m('.#modal.modal-wrapper', [
					m('.modal-container', [
						m('form.modal-form', [
							m('h2', 'New Module'),
							m('p', JSON.stringify(shortcut,null, 4)),
							m('.input-group', [
								m('p', [
									m('input[type=text]')
								]),
								m('p', [
									m('input[type=submit]', 'Create')
								])
							])
						]),
						m('a.modal-close[href="#closed"]', 'X') 
					])
				]);
      } else {
        return '';
      }
    };
  });
};
module.view = function (vm) {
  return [
		m('.shortcut-container', [
			shortcuts.map(function (shortcut) {
        return m('a.modal-link[href="#modal"]', {
          onclick: shortcut.modal.visible.bind(this, true)
        }, shortcut.name);
      })
		]),
		shortcuts.map(function (shortcut) {
      return shortcut.modal.view();
    })
	];
};
m.module(document.getElementById('nav'), module)
