const mongoose = require('mongoose');
const database = mongoose.connection;

mongoose.Promise = global.Promise; // Use native ES6 promises NOT the built in out of date pollyfll.
mongoose.connect('127.0.0.1:27017/database');

database.on('error', () => console.log('database (mongoose) connection error'));
database.once('open', () => console.log('database (mongoose) connected'));

module.exports = {
	mongoose,
	database
};
