var monoscope = module.exports = {};
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jade = require('jade');
var extend = require('util')._extend;
var fs = require('fs');

function compileTemplate(options) {
  var html = jade.compileFile(__dirname + '/public/index.jade')(options);
  fs.writeFileSync(__dirname + '/public/index.html', html);
}

//Public Functions
monoscope.run = function (shortcuts, config) {
  if (!shortcuts) {
    throw 'Shortcuts are required for monoscope to run.';
  }
  config = config || {};
  var shortcutString = 'window.shortcuts = ' + JSON.stringify(shortcuts) + ';';
  var options = {
    title: config.title || 'Monoscope',
    port: config.port || 8045,
    shortcuts: shortcutString,
    color: config.color || '#444'
  };

  compileTemplate(options);

  server.listen(options.port, function () {
    console.log('Monoscope running on port %d', options.port);
  });

  // Routing
  app.use(express.static(__dirname + '/public'));

  io.on('connection', function (socket) {
    socket.on('shortcut', function (info) {
      shortcuts.forEach(function (shortcut) {
        if (info.name === shortcut.name) {
          
          return shortcut.action(buildData(info));
        }
      });
    });
  });
};

/**
 * Convert the data returned from the UI to a more easily usable structure.
 */
function buildData(info) {
  var data = {};
  data.metadata = info;
  if (info.form) {
    info.form.forEach(function(field) {
      if (field.prop) {
        data[field.prop] = field.value;
      }
      else {
        data[field.label] = field.value;
      }
    });
  }
  return data;
}