const {mongoose} = require('./mongoose');
const transformerSchema = mongoose.Schema({
	name: String,
	autobot: Boolean,
	// created_at    : { type: Date, required: true, default: Date.now }
},
{
	timestamps: true
});
const Transformer = mongoose.model('Transformer', transformerSchema);

function addTransformer(data) {

	// console.log(typeof data.autobot);

    // if (!verifyTransformerData()) return console.log('transformer data is incorrect');

	const transformer = new Transformer(data);

	return transformer.save();

	// transformer.save((error, transformer) => {
	//
	// 	if (error) return console.log('error saving transformer', error);
	//
	// 	console.log('saved transformer', transformer);
	//
	// });

}

function verifyTransformerData({name, autobot}) {


}

function findAllTransformers() {

	return Transformer.find();

}

// Tweet.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
//   console.log( post );
// });

function findLastTransformerEntry() {

	// Transformer.findOne().sort({created_at: -1}).then((data) => {
	// Transformer.findOne().sort('-date').then((data) => {
	Transformer.findOne().sort('-updatedAt').then((data) => {

		console.log('findLastTransformerEntry - data', data);

	});


	// var query = Person.findOne({ 'name.last': 'Ghost' });

}

module.exports = {
	addTransformer,
	findAllTransformers,
	findLastTransformerEntry
};

// function renderTransformerScaffolds(data) {
//
// 	const scaffolds = data.map(({name}) => (`
// 		<h2>${name}</h2>
// 	`)).join('');
//
// 	return new Promise((resolve) => resolve(scaffolds));
//
// }
//
// function injectIntoHtmlScaffold(transformers) {
//
// 	const scaffold = (`
// 		some html up top
// 		<hr>
// 		${transformers}
// 		<hr>
// 		some html down bottom
// 	`);
//
// 	return new Promise((resolve) => resolve(scaffold));
//
// }
