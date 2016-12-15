const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Use native ES6 promises NOT the built in out of date pollyfll.
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);
// DB setup
// mongoose.connect('mongodb://mongo:27017/database');
// mongoose.connect('localhost:27017/database');
// mongoose.connect('http://localhost:27017/database');
mongoose.connect('127.0.0.1:27017/database');

const db = mongoose.connection;
const transformerSchema = mongoose.Schema({
	name: String,
	autobot: Boolean,
});
const Transformer = mongoose.model('Transformer', transformerSchema);

db.on('error', () => {

	console.error.bind(console, 'connection error:');

});

db.once('open', () => {

	console.log('database (mongoose) connected');

});

function addMultipleTransformers() {

	[
		{ name: 'Optimus Prime', autobot: true },
		{ name: 'Megatron', autobot: false },
		{ name: 'Star Scream', autobot: false },
	].map(addTransformer);

}

function addTransformer(data) {

    // if (!verifyTransformerData()) return console.log('transformer data is incorrect');

	var transformer = new Transformer(data);

	transformer.save((error, transformer) => {

		if (error) return console.log('error saving transformer', error);

		console.log('saved transformer', transformer);

	});

}

// addMultipleTransformers();

function verifyTransformerData({name, autobot}) {


}

// function *renderTransformers(res) {
//
// 	console.log('inside generator');
//
// 	const allTransformers = yield Transformer.find(); // findAllTransformers();
//
// 	console.log('allTransformers', allTransformers);
//
// 	res.send('Hello World');
//
// }


function findAllTransformers() {

	return Transformer.find();

}

function renderTransformerScaffolds(data) {

	const scaffolds = data.map(({name}) => (`
		<h2>${name}</h2>
	`)).join('');

	return new Promise((resolve) => resolve(scaffolds));

}

function injectIntoHtmlScaffold(transformers) {

	const scaffold = (`
		some html up top
		<hr>
		${transformers}
		<hr>
		some html down bottom
	`);

	return new Promise((resolve) => resolve(scaffold));

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get('/', (request, response) => {

	findAllTransformers()
		.then((data) => renderTransformerScaffolds(data))
		.then((transformers) => injectIntoHtmlScaffold(transformers))
		.then((html) => response.send(html));

});

app.get('/bin/', (request, response) => {

	response.send('Bin');

	console.log(request.query);

	addTransformer(request.query);

});

app.listen(3000, () => {

	console.log('Example app listening on port 3000!');

});

// curl -i http://localhost:3000/
// curl -i http://localhost:3000/bin/?name=bar&autobot=false
