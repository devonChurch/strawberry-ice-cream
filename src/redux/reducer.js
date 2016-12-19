import deepFreeze from 'deep-freeze';
import action from './action';
import extendWithUiState from './default-state/extend-with-ui-state';

// receive socket data
// click transformer to fetch data
	// update icon after receiving data

// const transformerItemReducer = (state = {}, {type, data = {}}) => {
function transformerItemsReducer(state = {}, {type, data = {}}) {

	console.log('type', type);

	deepFreeze(state);

	switch (type) {

		case action.RECEIVE_NEW_TRANSFORMER_DATA:
			return {
				...state,
				transformers: [
					...state.transformers,
					extendWithUiState(data)
				]
			}

		case action.UPDATE_TRANSFORMER_ALLEGIANCE:
			console.log('data', data);
			return state

		default:
			return state;

	}

}

export default transformerItemsReducer;
