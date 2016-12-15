module.exports = (state) => (`

	<!doctype html>
	<html lang="en">

	    <head>

	        <meta charset="utf-8">
	        <meta http-equiv="x-ua-compatible" content="ie=edge">
	        <title>Transformers</title>
	        <meta name="description" content="">
	        <meta name="viewport" content="width=device-width, initial-scale=1">

	        <link rel="apple-touch-icon" href="apple-touch-icon.png">
	        <!-- Place favicon.ico in the root directory -->

	        <!-- <link rel="stylesheet" href="css/normalize.css"> -->
	        <link rel="stylesheet" href="static/client.css">
	        <!-- <script src="js/vendor/modernizr-2.8.3.min.js"></script> -->

			<script>window.__REDUX_STATE__ = ${JSON.stringify(state)};</script>

	    </head>

	    <body>

			<h1>APP!</h1>
			<div id="app"></div>
	        <script src="static/client.js"></script>

	    </body>

	</html>

`);
