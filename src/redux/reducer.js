import deepFreeze from 'deep-freeze';

// receive socket data
// click transformer to fetch data
	// update icon after receiving data

// const transformerItemReducer = (state = {}, {type, data = {}}) => {
function transformerItemsReducer(state = {}, {type, data = {}}) {

	deepFreeze(state);

	switch (type) {

		default:
			return state;

	}

}

export default transformerItemsReducer;
