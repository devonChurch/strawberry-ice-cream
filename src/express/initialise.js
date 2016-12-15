const express = require('express');
const app = express();
const {addTransformer, findAllTransformers} = require('../mongo/transformer');
const generateHtml = require('../universal/html-boilerplate');

app.get('/', (request, response) => {

	findAllTransformers()
	// 	.then((data) => renderTransformerScaffolds(data))
		.then((data) => generateHtml(data))
		.then((html) => response.send(html));

});

app.get('/bin/', (request, response) => {

	const {query} = request;
	const message = `added transformer ${query.name} (${query.autobot ? 'autobot' : 'decepticon'}) to the database`;

	addTransformer(query);

	response.send(message);
	console.log(message);


});

app.listen(3000, () => {

	console.log('Example app listening on port 3000!');

});
