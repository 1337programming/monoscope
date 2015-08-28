var socket = io();
socket.emit('connected', 'Connected!');

function doStuff() {
	socket.emit('module', {
	    a: 'asdf',
	    b: new Date()
	});
}
