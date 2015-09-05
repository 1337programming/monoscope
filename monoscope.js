var monoscope = module.exports = {};
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jade = require('jade');
var extend = require('util')._extend;
var fs = require('fs');

function compileTemplate(options) {
    var html = jade.compileFile('./public/index.jade')(options);
    fs.writeFileSync('./public/index.html', html);
}

//Public Functions
monoscope.run = function(options) {
    options = options || {};
    var defaultOptions = {
        title: 'Monoscope',
        url: 'http://localhost:8080/',
        port: 8045
    };
    options = extend(defaultOptions, options);

    compileTemplate(options);

    server.listen(options.port, function() {
        console.log('Server listening at port %d', options.port);
    });

    // Routing
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/node_modules/mithril'));
    app.use(express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client'));
    var i = 0;

    io.on('connection', function(socket) {

        socket.on('connected', function(data) {
            console.log(data);
            /*socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
            });*/
        });

        socket.on('module', function(information) {
            console.log('hooray!');
        });

    });
};

monoscope.run({});
