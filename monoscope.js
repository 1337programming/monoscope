var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8045;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/'));


io.on('connection', function (socket) {

  socket.on('connected', function (data) {
    console.log(data);
    /*socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });*/
  });

});