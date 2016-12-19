import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import getDefaultState from './default-state/client';
import transformerItemsReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

function testReduxDevTools() {

	return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	// return window.devToolsExtension ? window.devToolsExtension() : undefined;

}

function createReduxStore(sagaMiddleware) {

	const composeEnhancers = testReduxDevTools() || compose;

	return createStore(
		transformerItemsReducer,
		getDefaultState(),
		composeEnhancers(
			applyMiddleware(sagaMiddleware)
		)
	);

	// return createStore(
	// 	// combineReducers({
	// 	// 	loginState: reducer.transformerItemReducer,
	// 	// }),
	// 	transformerItemsReducer,
	// 	getDefaultState(),
	// 	applyMiddleware(sagaMiddleware),
	// 	// testReduxDevTools(),
	// 	// applyMiddleware(reduxDevTools, sagaMiddleware)
	// );

}

function integrateRendererIntoReduxStore(reactRenderSequence) {

	const sagaMiddleware = createSagaMiddleware();
	const reduxDevTools = testReduxDevTools();
	const reduxStore = createReduxStore(sagaMiddleware);

	// Render on state change.
	reduxStore.subscribe(() => reactRenderSequence(reduxStore));
	// xxx
	sagaMiddleware.run(rootSaga)
	// Prompt initial render on page load.
	reactRenderSequence(reduxStore);

}

export default integrateRendererIntoReduxStore

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, preloadedState, composeEnhancers(
// 	applyMiddleware(...middleware)
// ));

// import rootSaga from './sagas'
//
// const sagaMiddleware = createSagaMiddleware()
// const store = ...
// sagaMiddleware.run(rootSaga)
