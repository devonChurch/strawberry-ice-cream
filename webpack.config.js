// var CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const validate = require('webpack-validator');

var preLoaderEslint = {
    test: /\.js$/,
    loaders: ['eslint'],
    include:  __dirname + '/src'
};

var loaderSass = {
    test: /\.scss$/,
	include:  __dirname + '/src',
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss-loader!sass')
};

var loaderJs = {
    test: /\.js$/,
    // exclude: /node_modules/,
    include:  __dirname + '/src',
    // Automatically generates source maps without the sourceMaps config
    loader: 'babel'
};

var eslintWarnings = {
    failOnWarning: false,
    failOnError: false
};

// We are creating two entry points, one for the server and one for the client.
// This segregation allows us to construct the basis for the universal React app.
// We can differentiate their targets and run their respective tasks independently.
module.exports = [
	{
		name: 'client',
		target: 'web',
		context: __dirname + '/src',
		devtool: 'source-map',
		entry: './client.js',
		output: {
			path: __dirname + '/dist/static',
			filename: 'client.js'
		},
		plugins: [
			new ExtractTextPlugin('style.css')
		],
		module: {
			preLoaders: [preLoaderEslint],
			loaders: [loaderSass, loaderJs]
		},
		postcss() {
			return [autoprefixer];
		},
		eslint: eslintWarnings
	},
	{
		name: 'server',
		target: 'node',
		context: __dirname + '/src',
		devtool: 'source-map',
		entry: './server.js',
		output: {
			path: __dirname + '/dist',
			filename: 'server.js',
			libraryTarget: 'commonjs'
		},
		externals: [
			/^(?!\.|\/).+/i,
		],
		// plugins: [
		//     new CopyWebpackPlugin([
		//         { from:  './feed.json', to: './feed.json' }
		//     ])
		// ],
		module: {
			preLoaders: [preLoaderEslint],
			loaders: [loaderJs]
		},
		eslint: eslintWarnings
	}
];
