import extendWithUiState from './extend-with-ui-state';

function getDefaultState() {

	const {transformers} = window.__REDUX_STATE__;

	return {
		transformers: extendWithUiState(transformers)
	};

}

export default getDefaultState;
