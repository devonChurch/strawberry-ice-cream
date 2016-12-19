import {createStore, combineReducers} from 'redux';
import getDefaultState from './default-state/client';
import transformerItemsReducer from './reducer';

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

	// Render on state change.
	reduxStore.subscribe(() => reactRenderSequence(reduxStore));
	// Prompt initial render on page load.
	reactRenderSequence(reduxStore);

}

export default integrateRendererIntoReduxStore
