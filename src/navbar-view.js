var Masonry = require('masonry-layout');
var m = require('mithril');
var inputs = require('./inputs');

function config(el) {
  new Masonry(el, {
    itemSelector: '.masonry-brick',
    transitionDuration: '0.5s',
    columnWidth: 250
  });
}

function openShortcut(shortcut, that) {
  var bindOpen = shortcut.modal.visible.bind(that, true);
  return function(e) {
    //Run shortcut if no form is specified.
    if (shortcut.form.length === 0) {
      vm.submit(shortcut)(e);
    }
    else {
      bindOpen();
    }
  };
};

module.exports = function(vm) {
  return [
        m('.shortcut-container', [
            m('.grid', {
        config: config
      }, vm.shortcuts().map(function(shortcut) {
        return m('.masonry-brick', [
          m('.masonry-inner', {
            style: {
              padding: '10px'
            }
          },[
            m('h2', shortcut.name),
            m('hr'),
            shortcut.form.map(function(field) {
              return m('.group', [
                m('label[for=' + field.id + ']', field.label),
                m('br'),
                inputs.createInput(field),
                m('hr')
              ]);
            }),
            m('input.btn.btn-primary.btn-md.full-width[type=submit]', {
              onclick: vm.submit(shortcut),
              value: 'Run'
            })
          ])
        ]);
      }))
    ])
  ];
};
