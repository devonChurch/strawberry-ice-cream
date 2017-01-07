const express = require('express');
const app = express();
const {checkTransformerRelevance, checkTransformerExistence, addTransformer, findAllTransformers, filterNameAndId, filterIsAutobot, findAllegianceAgainstId, seedDatabase} = require('../mongo/transformer');
const generateHtml = require('../universal/html-boilerplate');

console.log('seedDatabase (initilise)', seedDatabase);

// Must be called from the NPM script to lock the cwd as the root app directory.
const cwdStart = `${process.cwd()}/dist/public`;
app.use('/', express.static(cwdStart));

function requestApp(request, response) {

	findAllTransformers()
		.then(filterNameAndId)
		.then(generateHtml)
		.then((html) => response.send(html));

}

function requestIsAutobot(request, response) {

	const {query} = request;
	findAllegianceAgainstId(query)
		.then(filterIsAutobot)
		.then(({isAutobot}) => {

			console.log('got back isAutobot', isAutobot);
			response.setHeader('Content-Type', 'application/json');
			response.send(JSON.stringify({isAutobot}));

		});

}

function sendModificationStatus(response, status) {

	response.send(status);
	console.log(status);

}

function requestModifiy(request, response) {

	const {pushLatestEntryToUsers} = require('../socketio/send');
	const {query} = request;

	checkTransformerRelevance(query)
		.then(checkTransformerExistence)
		.then(addTransformer)
		.then(pushLatestEntryToUsers)
		.then(() => sendModificationStatus(response, `added transformer ${query.name} (${query.autobot ? 'autobot' : 'decepticon'}) to the database`))
		.catch((error) => sendModificationStatus(response, error));

	// http://localhost:3000/bin/modify/?name=Optimus Prime&isAutobot=true
	// http://localhost:3000/bin/modify/?name=Megatron&isAutobot=false
	// http://localhost:3000/bin/modify/?name=Bumblebee&isAutobot=true
	// http://localhost:3000/bin/modify/?name=Starscream&isAutobot=false
	// http://localhost:3000/bin/modify/?name=Ironhide&isAutobot=true
	// http://localhost:3000/bin/modify/?name=Soundwave&isAutobot=false
	// http://localhost:3000/bin/modify/?name=Ratchet&isAutobot=true

}

app.get('*', (request, response) => {

	console.log(`got "(${request.path})" request`);

	switch (request.path) {

		case '/':
			return requestApp(request, response);

		case '/bin/is-autobot/':
			// curl -i http://localhost:3000/bin/is-autobot/?_id=1234567890
			return requestIsAutobot(request, response);

		case '/bin/modify/':
			// curl -i http://localhost:3000/bin/modify/?name=starscream&isAutobot=false
			return requestModifiy(request, response);

		default:
			response.status(404).send('Not found');

	}

});

// app.listen(3000);

module.exports = app;
