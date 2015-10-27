var Masonry = require('masonry-layout');
var m = require('mithril');

function config(el, isInit, ctx) {
  var setup = function() {
    var msnry = new Masonry(el, {
      itemSelector: '.masonry-brick',
      transitionDuration: '0.0s'
    });
  };
  //setTimeout(setup, 0);
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
        m('.container-fluid.shortcut-container', [
            m('.grid.row', {
                config: config
            }, vm.shortcuts().map(function(shortcut) {
                return m('.col-xs-12.col-sm-6.col-md-4.col-lg-3.masonry-brick.card.card-block.masonry-brick', [
                    m('.card-contents', [
                        m('p', shortcut.name)
                    ])
                ]);
            }))
        ])
    ];
};
