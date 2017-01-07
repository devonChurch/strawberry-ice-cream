const express = require('../express/initialise');
const http = require('http').Server(express);
const socket = require('socket.io')(http);
const port = 3000;
const {findLastTransformerEntry, filterNameAndId} = require('../mongo/transformer');

http.listen(port, () => console.log(`http server listening on port ${port}`));

function pushLatestEntryToUsers() {

	return findLastTransformerEntry()
		.then((data) => {

			const filteredData = filterNameAndId(data);
			console.log('sending data to the client', filteredData);
			socket.emit('newTransformerEntry', filteredData);

		});

}

module.exports = {
	pushLatestEntryToUsers
};
