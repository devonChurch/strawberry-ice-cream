const {mongoose} = require('./mongoose');
const seedData = require('./seed');
const transformerSchema = mongoose.Schema(
	{
		name: String,
		isAutobot: Boolean,
	},
	{
		timestamps: true
	}
);
const Transformer = mongoose.model('Transformer', transformerSchema);

function checkTransformerRelevance({name, isAutobot}) {

	console.log(`checkTransformerRelevance, name = ${name} | isAutobot = ${isAutobot}`);

	return new Promise((resolve, reject) => {

		if (name && isAutobot) resolve({name, isAutobot});
		else reject('invalid data set please try again');

	});

}

function addTransformer(data) {

	const transformer = new Transformer(data);

	return transformer.save();

}

function checkTransformerExistence({name, isAutobot}) {

	console.log(`checkTransformerExistence, name = ${name} | isAutobot = ${isAutobot}`);

	return new Promise((resolve, reject) => {

		console.log('made new promise');

		Transformer
			.findOne({name})
			.then((data) => {

				console.log('got back existance data', data);

				if (data) reject('transformer alredady exists');
				else resolve({name, isAutobot});

			});

	});



}

function findAllTransformers() {

	return Transformer.find();

}

function findLastTransformerEntry() {

	return Transformer.findOne().sort('-updatedAt');

}

function findAllegianceAgainstId({_id}) {

	return Transformer.findOne({_id});

}

function extractIsAutobot({isAutobot}) {

	console.log('extractIsAutobot', isAutobot);

	return {isAutobot};

}

function filterIsAutobot(data) {

	console.log('filterIsAutobot', data);

	// {"_id":"5853ba93b2fcae9d8e0d7ada","name":"banana","isAutobot":true,"__v":0}

	const isArray = Array.isArray(data);

	switch (isArray) {

		case true:
			return data.map(extractIsAutobot);

		default:
			return extractIsAutobot(data);

	}

}

function extractNameAndId({_id, name}) {

	return {_id, name};

}

function filterNameAndId(data) {

	// {"_id":"5853ba93b2fcae9d8e0d7ada","name":"banana","isAutobot":true,"__v":0}

	const isArray = Array.isArray(data);

	switch (isArray) {

		case true:
			return data.map(extractNameAndId);

		default:
			return extractNameAndId(data);

	}

}


function seedWithTransformers() {

	console.log('seeding database with preset transformers');
	console.log('seedData', seedData);
	seedData.forEach((data) => {

		checkTransformerExistence(data)
			.then(addTransformer);

	});

}

module.exports = {
	checkTransformerRelevance,
	checkTransformerExistence,
	addTransformer,
	findAllTransformers,
	findLastTransformerEntry,
	findAllegianceAgainstId,
	filterIsAutobot,
	filterNameAndId,
	seedWithTransformers
};
