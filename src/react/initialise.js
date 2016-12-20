import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import integrateRendererIntoReduxStore from '../redux/initialise';
import AppContainer from './components/app/container';

const app = document.getElementById('app');

function reactRenderSequence(reduxStore) {

	render(
		<Provider store={reduxStore}>
			<AppContainer/>
		</Provider>,
		app
	);

}

integrateRendererIntoReduxStore(reactRenderSequence);
