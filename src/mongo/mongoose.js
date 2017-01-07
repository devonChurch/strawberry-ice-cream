const mongoose = require('mongoose');
const database = mongoose.connection;

mongoose.Promise = global.Promise; // Use native ES6 promises NOT the built in out of date pollyfll.
// mongoose.connect('mongodb://127.0.0.1:27017/database');
// mongoose.connect('mongodb://127.0.0.1:27017');
// mongoose.connect('mongodb://127.0.0.1:27017/db');

// "mongodb" = the name of the Docker image name.
mongoose.connect('mongodb://mongodb:27017');




// 172.18.0.1:42942
// mongoose.connect('mongodb://172.18.0.1:27017/database');
// mongoose.connect('mongodb://172.17.0.2:27017/database');
// mongoose.connect('mongodb://db_1:27017/database');
// mongoose.connect('mongodb://mongo:27017/database');
// mongoose.connect('mongodb://mongo:27017'); // 'mongodb://db_1:27017/test' //  'mongodb://localhost/test'

database.on('error', () => console.log('database (mongoose) connection error'));
database.once('open', () => console.log('database (mongoose) connected'));

module.exports = {
	mongoose,
	database
};
