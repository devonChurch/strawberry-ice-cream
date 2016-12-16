const express = require('../express/initialise');
const http = require('http').Server(express);
const socket = require('socket.io')(http);
const {findLastTransformerEntry} = require('../mongo/transformer');

http.listen(8000, () => {

	console.log('http server listening on port 3000');

});

function pushLatestEntryToUsers() {

	console.log('pushLatestEntryToUsers');

	findLastTransformerEntry();
	socket.emit('newTransformerEntry', { for: 'everyone' });

}

module.exports = {
	pushLatestEntryToUsers
};
