import listenForDatabaseChanges from '../../../socketio/receive';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import action from '../../../redux/action';
import App from './presentation';
import TransformerListContainer from '../transformer-list/container';

class AppContainer extends Component {

	componentDidMount() {

		console.log('AppContainer | componentDidMount');

		listenForDatabaseChanges((data) => {

			console.log('got new transformer data', data);
			console.log('this', this);

			this.props.dispatch({
				type: action.RECEIVE_NEW_TRANSFORMER_DATA,
				data
			});

		});

	}

	fetchTransformerAllegiance() {

		// this.props.dispatch({
		// 	type: action.FETCH_TRANSFORMER_ALLEGIANCE,
		// 	data: {
		// 		_id:
		// 		isFetching: true
		// 	}
		// });

	}

	render() {

		console.log('this', this);

        return (
            <App>
				<h1>Transformers</h1>
				<TransformerListContainer
					transformers={this.props.transformers}/>
            </App>
        );

    }

}

// export default AppContainer;
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AppContainer);
