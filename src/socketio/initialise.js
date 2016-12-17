const express = require('../express/initialise');
const http = require('http').Server(express);
const socket = require('socket.io')(http);
const {findLastTransformerEntry, filterNameAndId} = require('../mongo/transformer');

http.listen(8000, () => console.log('http server listening on port 3000'));

function pushLatestEntryToUsers() {

	findLastTransformerEntry()
		.then((data) => {

			const filteredData = filterNameAndId(data);
			console.log('sending data to the client', filteredData);
			socket.emit('newTransformerEntry', filteredData);

		});

}

module.exports = {
	pushLatestEntryToUsers
};
