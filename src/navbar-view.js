var Masonry = require('masonry-layout');
var m = require('mithril');
var inputs = require('./inputs');
function config(el, isInit, ctx) {
  var setup = function() {
    var msnry = new Masonry(el, {
      itemSelector: '.masonry-brick',
      transitionDuration: '0.5s'
    });
  };
  setTimeout(setup, 1000);
}

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

module.exports = function(vm) {
  return [
        m('.shortcut-container', [
            m('.grid', {
                config: config
            }, vm.shortcuts().map(function(shortcut) {
                return m('.col-xs-12.col-sm-6.col-md-4.col-lg-3.masonry-brick.card.card-block.masonry-brick', [
                    m('.card-contents', [
                      shortcut.form.map(function(field) {
                            return m('.group', [
                                m('label[for=' + field.id + ']', field.label),
                                m('br'),
                                inputs.createInput(field),
                                m('hr')
                            ]);
                        }),
                        m('input.btn.btn-md.full-width[type=submit]', {
                            onclick: vm.submit(shortcut),
                            value: shortcut.name
                        })
                    ])
                ]);
            }))
        ])
    ];
};
