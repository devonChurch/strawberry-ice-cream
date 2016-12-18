import {createStore, combineReducers} from 'redux';
import getDefaultState from './default-state/client';
import transformerItemsReducer from './reducer';

console.log('getDefaultState()', getDefaultState());

function devTools() {

	return window.devToolsExtension ? window.devToolsExtension() : undefined;

}

function createReduxStore() {

	return createStore(
		// combineReducers({
		// 	loginState: reducer.transformerItemReducer,
		// }),
		transformerItemsReducer,
		getDefaultState(),
		devTools()
	);

}

function integrateRendererIntoReduxStore(reactRenderSequence) {

	const reduxStore = createReduxStore();

	console.log('reduxStore', reduxStore);

	// Render on state change.
	reduxStore.subscribe(() => reactRenderSequence(reduxStore));
	// Prompt initial render on page load.
	reactRenderSequence(reduxStore);

}

export default integrateRendererIntoReduxStore
