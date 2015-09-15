var monoscope = module.exports = {};
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jade = require('jade');
var extend = require('util')._extend;
var fs = require('fs');
var config = require('./monoscope.json');

function compileTemplate(options) {
  var html = jade.compileFile('./public/index.jade')(options);
  fs.writeFileSync('./public/index.html', html);
}

//Public Functions
monoscope.run = function () {
  var options = {
    title: config.title,
    url: 'http://localhost:' + config.appPort + '/',
    port: config.monoscopePort
  };

  compileTemplate(options);

  server.listen(options.port, function () {
    console.log('Server listening at port %d', options.port);
  });

  // Routing
  app.use(express.static(__dirname + '/public'));

  io.on('connection', function (socket) {

    socket.on('connected', function (data) {
      console.log(data);
      /*socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
      });*/
    });

    socket.on('shortcut', function (information) {
      console.log(JSON.stringify(information, null, 4));
    });

  });
};

monoscope.run({});
