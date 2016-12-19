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
			};

		case action.UPDATE_TRANSFORMER_ALLEGIANCE:
			console.log('UPDATE_TRANSFORMER_ALLEGIANCE', data);
			return {
				...state,
				transformers: state.transformers.map((transformer) => {

					console.log(`${transformer._id} === ${data._id} -> ${transformer._id === data._id} (isAutobot = ${data.isAutobot})`);

					switch (transformer._id === data._id) {

						case true:
							return {
								...transformer,
								isAutobot: data.isAutobot,
								isFetching: false,
								isFetched: true
							};

						default:
							return transformer;

					}

				})

			};

		default:
			return state;

	}

}

export default transformerItemsReducer;
