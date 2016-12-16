const express = require('express');
const app = express();
const {addTransformer, findAllTransformers} = require('../mongo/transformer');
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


app.get('/', (request, response) => {

	// response.send(`
	// 	<p>Hello</p>
	// 	<img src="/kitten.jpg" alt="kitten">
	// `);

	// <img src="https://placekitten.com/g/200/300" alt="kitten">
	// <script src="/temp.js"></script>

	findAllTransformers()
	// 	.then((data) => renderTransformerScaffolds(data))
		.then((data) => generateHtml(data))
		.then((html) => response.status(200).send(html));

});

app.get('/bin/', (request, response) => {

	const {pushLatestEntryToUsers} = require('../socketio/initialise');
	const {query} = request;
	const message = `added transformer ${query.name} (${query.autobot ? 'autobot' : 'decepticon'}) to the database`;

	addTransformer(query)
		.then(pushLatestEntryToUsers);

	response.send(message);
	console.log(message);

});

// app.listen(3000);

// app.listen(3000, () => {
//
// 	console.log('Express app listening on port 3000!');
//
// });

module.exports = app;
