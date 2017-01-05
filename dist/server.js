(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	console.log('express has initialised');
	
	__webpack_require__(7);
	console.log('socketio has initialised');
	
	__webpack_require__(10);
	console.log('mongo has initialised');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var express = __webpack_require__(2);
	var app = express();
	
	var _require = __webpack_require__(3),
	    addTransformer = _require.addTransformer,
	    findAllTransformers = _require.findAllTransformers,
	    filterNameAndId = _require.filterNameAndId,
	    filterIsAutobot = _require.filterIsAutobot,
	    findAllegianceAgainstId = _require.findAllegianceAgainstId;
	
	var generateHtml = __webpack_require__(6);
	// const path = require('path');
	
	// app.use('/', express.static('/public'));
	// app.use('/static', express.static(__dirname + '/public'));
	// app.use(express.static('/public'));
	// console.log(path.join(__dirname, 'public'));
	// app.use(express.static(__dirname + '/public'));
	// app.use(express.static('/public'));
	// app.use(express.static('public'));
	// app.use(express.static(__dirname + '/public'));
	
	// const path = require('path');
	// app.use('/', express.static(path.join(__dirname, '/public')));
	// app.use('/public', express.static(path.join(__dirname, '/public')));
	// app.use(express.static(path.join(__dirname, '/public')));
	// app.use(express.static(path.join(__dirname, 'public')));
	// app.use(express.static(path.resolve(__dirname, 'public')));
	// app.use('/public', express.static(path.join(__dirname, '/public')));
	//
	var cwdStart = process.cwd() + '/dist/public';
	app.use('/', express.static(cwdStart));
	
	// console.log(path.join(__dirname, 'public'));
	
	// const fs = require('fs');
	// const kitten = fs.readFileSync(path.join(__dirname, '/public/kitten.jpg'));
	// console.log('kitten', kitten);
	// const kittenPath = path.join(__dirname, '/public');
	
	// console.log(`path.join(__dirname, '/public'`, path.join(__dirname, '/public'));
	// console.log(`path.resolve(__dirname, '/public'`, path.resolve(__dirname, '/public'));
	// console.log('__filename', __filename);
	// console.log('__dirname', __dirname);
	// console.log('process.cwd()', process.cwd());
	// console.log('cwdStart', cwdStart);
	//
	// const kittenPath = cwdStart; // path.join(__dirname, '/');
	// fs.readdir(kittenPath, (err, files) => {
	//   files.forEach(file => {
	//     console.log(file);
	//   });
	// })
	
	function requestApp(request, response) {
	
		findAllTransformers().then(filterNameAndId).then(generateHtml).then(function (html) {
			return response.send(html);
		});
	
		// response.send('hello');
	}
	
	function requestIsAutobot(request, response) {
		var query = request.query;
	
		findAllegianceAgainstId(query).then(filterIsAutobot).then(function (_ref) {
			var isAutobot = _ref.isAutobot;
	
	
			console.log('got back isAutobot', isAutobot);
			response.setHeader('Content-Type', 'application/json');
			response.send(JSON.stringify({ isAutobot: isAutobot }));
		});
	}
	
	function requestModifiy(request, response) {
		var _require2 = __webpack_require__(7),
		    pushLatestEntryToUsers = _require2.pushLatestEntryToUsers;
	
		var query = request.query;
	
		var message = 'added transformer ' + query.name + ' (' + (query.autobot ? 'autobot' : 'decepticon') + ') to the database';
	
		addTransformer(query).then(pushLatestEntryToUsers);
	
		response.send(message);
		console.log(message);
	
		// http://localhost:3000/bin/modify/?name=Optimus Prime&isAutobot=true
		// http://localhost:3000/bin/modify/?name=Megatron&isAutobot=false
		// http://localhost:3000/bin/modify/?name=Bumblebee&isAutobot=true
		// http://localhost:3000/bin/modify/?name=Starscream&isAutobot=false
		// http://localhost:3000/bin/modify/?name=Ironhide&isAutobot=true
		// http://localhost:3000/bin/modify/?name=Soundwave&isAutobot=false
		// http://localhost:3000/bin/modify/?name=Ratchet&isAutobot=true
	}
	
	app.get('*', function (request, response) {
	
		console.log('got "(' + request.path + ')" request');
	
		switch (request.path) {
	
			case '/':
				return requestApp(request, response);
	
			case '/bin/is-autobot/':
				// curl -i http://localhost:3000/bin/is-autobot/?_id=1234567890
				return requestIsAutobot(request, response);
	
			case '/bin/modify/':
				// curl -i http://localhost:3000/bin/modify/?name=starscream&isAutobot=false
				return requestModifiy(request, response);
	
			default:
				response.status(404).send('Not found');
	
		}
	});
	
	// app.listen(3000);
	
	module.exports = app;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(4),
	    mongoose = _require.mongoose;
	
	var transformerSchema = mongoose.Schema({
		name: String,
		isAutobot: Boolean
	}, {
		timestamps: true
	});
	var Transformer = mongoose.model('Transformer', transformerSchema);
	
	function addTransformer(data) {
	
		// if (!verifyTransformerData()) return console.log('transformer data is incorrect');
	
		var transformer = new Transformer(data);
	
		return transformer.save();
	}
	
	function verifyTransformerData(_ref) {
		var name = _ref.name,
		    isAutobot = _ref.isAutobot;
	}
	
	function findAllTransformers() {
	
		return Transformer.find();
	}
	
	function findLastTransformerEntry() {
	
		return Transformer.findOne().sort('-updatedAt');
	}
	
	function findAllegianceAgainstId(_ref2) {
		var _id = _ref2._id;
	
	
		return Transformer.findOne({ _id: _id });
	}
	
	function extractIsAutobot(_ref3) {
		var isAutobot = _ref3.isAutobot;
	
	
		console.log('extractIsAutobot', isAutobot);
	
		return { isAutobot: isAutobot };
	}
	
	function filterIsAutobot(data) {
	
		console.log('filterIsAutobot', data);
	
		// {"_id":"5853ba93b2fcae9d8e0d7ada","name":"banana","isAutobot":true,"__v":0}
	
		var isArray = Array.isArray(data);
	
		switch (isArray) {
	
			case true:
				return data.map(extractIsAutobot);
	
			default:
				return extractIsAutobot(data);
	
		}
	}
	
	function extractNameAndId(_ref4) {
		var _id = _ref4._id,
		    name = _ref4.name;
	
	
		return { _id: _id, name: name };
	}
	
	function filterNameAndId(data) {
	
		// {"_id":"5853ba93b2fcae9d8e0d7ada","name":"banana","isAutobot":true,"__v":0}
	
		var isArray = Array.isArray(data);
	
		switch (isArray) {
	
			case true:
				return data.map(extractNameAndId);
	
			default:
				return extractNameAndId(data);
	
		}
	}
	
	module.exports = {
		addTransformer: addTransformer,
		findAllTransformers: findAllTransformers,
		findLastTransformerEntry: findLastTransformerEntry,
		findAllegianceAgainstId: findAllegianceAgainstId,
		filterIsAutobot: filterIsAutobot,
		filterNameAndId: filterNameAndId
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mongoose = __webpack_require__(5);
	var database = mongoose.connection;
	
	mongoose.Promise = global.Promise; // Use native ES6 promises NOT the built in out of date pollyfll.
	// mongoose.connect('mongodb://127.0.0.1:27017/database');
	// mongoose.connect('mongodb://127.0.0.1:27017');
	// mongoose.connect('mongodb://127.0.0.1:27017/db');
	mongoose.connect('mongodb://mongodb:27017');
	// mongoose.connect('mongodb://127.0.0.1:27017');
	//
	// mongoose.connect('mongodb://mongo:27017');
	
	
	// 172.18.0.1:42942
	// mongoose.connect('mongodb://172.18.0.1:27017/database');
	// mongoose.connect('mongodb://172.17.0.2:27017/database');
	// mongoose.connect('mongodb://db_1:27017/database');
	// mongoose.connect('mongodb://mongo:27017/database');
	// mongoose.connect('mongodb://mongo:27017'); // 'mongodb://db_1:27017/test' //  'mongodb://localhost/test'
	
	database.on('error', function () {
		return console.log('database (mongoose) connection error');
	});
	database.once('open', function () {
		return console.log('database (mongoose) connected');
	});
	
	module.exports = {
		mongoose: mongoose,
		database: database
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	
		var doctype = '<!doctype html>';
		var html = '<html lang="en">\n\n\t\t\t<head>\n\n\t\t\t\t<meta charset="utf-8">\n\t\t\t\t<meta http-equiv="x-ua-compatible" content="ie=edge">\n\t\t\t\t<title>Transformers</title>\n\t\t\t\t<meta name="description" content="">\n\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1">\n\n\t\t\t\t<link rel="stylesheet" href="/client.css">\n\n\t\t\t\t<script>\n\t\t\t\t\twindow.__REDUX_STATE__ = {\n\t\t\t\t\t\ttransformers: ' + JSON.stringify(state) + '\n\t\t\t\t\t};\n\t\t\t\t</script>\n\n\t\t\t</head>\n\n\t\t\t<body>\n\n\t\t\t\t<div id="app"></div>\n\t\t\t\t<script src="/client.js"></script>\n\n\t\t\t</body>\n\n\t\t</html>';
	
		// Forcing the doctype to butt right up as the first character on the first
		// line to avoid a syntax error on the client.
		return doctype + '\n' + html;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var express = __webpack_require__(1);
	var http = __webpack_require__(8).Server(express);
	var socket = __webpack_require__(9)(http);
	var port = 3000;
	
	var _require = __webpack_require__(3),
	    findLastTransformerEntry = _require.findLastTransformerEntry,
	    filterNameAndId = _require.filterNameAndId;
	
	http.listen(port, function () {
		return console.log('http server listening on port ' + port);
	});
	
	function pushLatestEntryToUsers() {
	
		findLastTransformerEntry().then(function (data) {
	
			var filteredData = filterNameAndId(data);
			console.log('sending data to the client', filteredData);
			socket.emit('newTransformerEntry', filteredData);
		});
	}
	
	module.exports = {
		pushLatestEntryToUsers: pushLatestEntryToUsers
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(4);

/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map