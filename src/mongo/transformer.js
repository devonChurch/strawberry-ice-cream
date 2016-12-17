const {mongoose} = require('./mongoose');
const transformerSchema = mongoose.Schema(
	{
		name: String,
		autobot: Boolean,
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

function verifyTransformerData({name, autobot}) {


}

function findAllTransformers() {

	return Transformer.find();

}

function findLastTransformerEntry() {

	return Transformer.findOne().sort('-updatedAt');

}

function extractNameAndId({_id, name}) {

	return {_id, name};

}

function filterNameAndId(data) {

	// {"_id":"5853ba93b2fcae9d8e0d7ada","name":"banana","autobot":true,"__v":0}

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
	filterNameAndId
};
