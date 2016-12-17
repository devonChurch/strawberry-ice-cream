const socket = require('socket.io-client')();

socket.on('connect', () => console.log('socket connect'));
socket.on('disconnect', () => console.log('socket disconnect'));
socket.on('newTransformerEntry', (data) => console.log('newTransformerEntry', data));
