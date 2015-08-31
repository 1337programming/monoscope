var socket = io();
socket.emit('connected', 'Connected!');

function createModule() {
  socket.emit('module', {
      a: 'asdf',
      b: new Date()
  });
}
