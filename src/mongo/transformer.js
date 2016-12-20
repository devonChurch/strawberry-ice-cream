const {mongoose} = require('./mongoose');
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

function addTransformer(data) {

	// if (!verifyTransformerData()) return console.log('transformer data is incorrect');

	const transformer = new Transformer(data);

	return transformer.save();

}

function verifyTransformerData({name, isAutobot}) {


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

module.exports = {
	addTransformer,
	findAllTransformers,
	findLastTransformerEntry,
	findAllegianceAgainstId,
	filterIsAutobot,
	filterNameAndId
};
