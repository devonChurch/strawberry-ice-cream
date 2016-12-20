import deepFreeze from 'deep-freeze';
import action from './action';
import extendWithUiState from './default-state/extend-with-ui-state';

function transformerItemsReducer(state = {}, {type, data = {}}) {

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
			return {
				...state,
				transformers: state.transformers.map((transformer) => {

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
