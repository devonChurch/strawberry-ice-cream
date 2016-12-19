function injectUiState(data) {

	return {
		...data,
		isFetching: false,
		isFetched: false
	};

}

function extendWithUiState(data) {

	const isArray = Array.isArray(data);

	switch (isArray) {

		case true:
			return data.map(injectUiState);

		default:
			return injectUiState(data);

	}

}

export default extendWithUiState;
