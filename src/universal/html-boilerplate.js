module.exports = (state = []) => {

	const doctype = '<!doctype html>';
	const html = (
		`<html lang="en">

			<head>

				<meta charset="utf-8">
				<meta http-equiv="x-ua-compatible" content="ie=edge">
				<title>Transformers</title>
				<meta name="description" content="">
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<link rel="stylesheet" href="/client.css">

				<script>
					window.__REDUX_STATE__ = {
						transformers: ${JSON.stringify(state)}
					};
				</script>

			</head>

			<body>

				<div id="app"></div>
				<script src="/client.js"></script>

			</body>

		</html>`
	);

	// Forcing the doctype to butt right up as the first character on the first
	// line to avoid a syntax error on the client.
	return (`${doctype}\n${html}`);

};
