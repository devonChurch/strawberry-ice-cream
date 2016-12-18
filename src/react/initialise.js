import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import integrateRendererIntoReduxStore from '../redux/initialise';
// import reducer from './state/reducer';
// import defaultState from './state/default';
// import defaultProps from './props/default';
// import AppContainer from './app/container';
const app = document.getElementById('app');

function reactRenderSequence(reduxStore) {

	console.log('reactRenderSequence', reduxStore);

	render(
		<Provider store={reduxStore}>
			{/*<AppContainer/>*/}
			<div>Hello</div>
		</Provider>,
		app
	);

}

integrateRendererIntoReduxStore(reactRenderSequence);
