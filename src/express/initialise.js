const express = require('express');
const app = express();
const {addTransformer, findAllTransformers, filterNameAndId, filterIsAutobot, findAllegianceAgainstId} = require('../mongo/transformer');
const generateHtml = require('../universal/html-boilerplate');
// const path = require('path');

// app.use('/', express.static('/public'));
// app.use('/static', express.static(__dirname + '/public'));
// app.use(express.static('/public'));
// console.log(path.join(__dirname, 'public'));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static('/public'));
// app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

// const path = require('path');
// app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/public', express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, 'public')));
// app.use('/public', express.static(path.join(__dirname, '/public')));
//
const cwdStart = `${process.cwd()}/dist/public`;
app.use('/', express.static(cwdStart));

// console.log(path.join(__dirname, 'public'));

// const fs = require('fs');
// const kitten = fs.readFileSync(path.join(__dirname, '/public/kitten.jpg'));
// console.log('kitten', kitten);
// const kittenPath = path.join(__dirname, '/public');

// console.log(`path.join(__dirname, '/public'`, path.join(__dirname, '/public'));
// console.log(`path.resolve(__dirname, '/public'`, path.resolve(__dirname, '/public'));
// console.log('__filename', __filename);
// console.log('__dirname', __dirname);
// console.log('process.cwd()', process.cwd());
// console.log('cwdStart', cwdStart);
//
// const kittenPath = cwdStart; // path.join(__dirname, '/');
// fs.readdir(kittenPath, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })

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

function requestModifiy(request, response) {

	const {pushLatestEntryToUsers} = require('../socketio/send');
	const {query} = request;
	const message = `added transformer ${query.name} (${query.autobot ? 'autobot' : 'decepticon'}) to the database`;

	addTransformer(query)
		.then(pushLatestEntryToUsers);

	response.send(message);
	console.log(message);

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
