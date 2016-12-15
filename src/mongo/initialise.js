require('./mongoose');
// require('./database');


// const database = mongoose.connection;
//
// database.on('error', () => console.log('database (mongoose) connection error'));
// database.once('open', () => console.log('database (mongoose) connected'));
//
//
// const transformerSchema = mongoose.Schema({
// 	name: String,
// 	autobot: Boolean,
// });
// const Transformer = mongoose.model('Transformer', transformerSchema);



// mongoose.connect('mongodb://mongo:27017/database');
// mongoose.connect('localhost:27017/database');
// mongoose.connect('http://localhost:27017/database');




// function addTransformer(data) {
//
// 	// console.log(typeof data.autobot);
//
//     // if (!verifyTransformerData()) return console.log('transformer data is incorrect');
//
// 	var transformer = new Transformer(data);
//
// 	transformer.save((error, transformer) => {
//
// 		if (error) return console.log('error saving transformer', error);
//
// 		console.log('saved transformer', transformer);
//
// 	});
//
// }
// function verifyTransformerData({name, autobot}) {
//
//
// }
// function findAllTransformers() {
//
// 	return Transformer.find();
//
// }
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
