const socket = require('socket.io-client')();

socket.on('connect', () => console.log('socket connect'));
socket.on('disconnect', () => console.log('socket disconnect'));

function listenForDatabaseChanges(callback) {

	socket.on('newTransformerEntry', (data) => callback(data));

}

export default listenForDatabaseChanges;
