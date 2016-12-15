const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Use native ES6 promises NOT the built in out of date pollyfll.
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);
// DB setup
// mongoose.connect('mongodb://mongo:27017/data');
// mongoose.connect('localhost:27017/data');
// mongoose.connect('http://localhost:27017/data');
mongoose.connect('127.0.0.1:27017/data');
const db = mongoose.connection;
const transformerSchema = mongoose.Schema({
    name: String,
    autobot: Boolean
});
const Transformer = mongoose.model('Transformer', transformerSchema);

db.on('error', () => {

    console.error.bind(console, 'connection error:')

});

db.once('open', () => {

    console.log('database (mongoose) connected');

});

function addMultipleTransformers() {

    const data = [
        { name: 'Optimus Prime', autobot: true },
        { name: 'Megatron', autobot: false },
        { name: 'Star Scream', autobot: false }
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

function findAllTransformers() {

    return Transformer.find().then(() => console.log('GOT TRANSFORMERS'));

    // Transformer.find((error, transformer) => {
    //
    //     if (error) return console.erroror(error);
    //     console.log(transformer);
    //
    // });

}

function *renderTransformers(res) {

    console.log('inside generator');

    const allTransformers = yield findAllTransformers();

    console.log('allTransformers', allTransformers);

    res.send('Hello World');

}

// const transformers = findAllTransformers();

// need new promise library
// why not generic es6 promises?

// DeprecationWarning: Mongoose: mpromise (mongoose's default promise library)
// is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

// res.send('Hello World');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get('/', (req, res) => {


    renderTransformers(res).next();

});

// app.get('/', (req, res) => {
//
//     res.send('Hello World');
//
// });

app.get('/bin/', (req, res) => {

    res.send('Bin');

    console.log(req.query);

    addTransformer(req.query);

});

app.listen(3000, () => {

    console.log('Example app listening on port 3000!');

});

// curl -i http://localhost:3000/
