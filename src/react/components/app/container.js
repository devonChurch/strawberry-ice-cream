import listenForDatabaseChanges from '../../../socketio/receive';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import action from '../../../redux/action';
import App from './presentation';
import TransformerListContainer from '../transformer-list/container';

class AppContainer extends Component {

	constructor() {

		super();
		this.fetchTransformerAllegiance = this.fetchTransformerAllegiance.bind(this);

	}

	componentDidMount() {

		listenForDatabaseChanges((data) => {

			this.props.dispatch({
				type: action.RECEIVE_NEW_TRANSFORMER_DATA,
				data
			});

		});

	}

	fetchTransformerAllegiance(_id) {

		this.props.dispatch({
			type: action.FETCH_TRANSFORMER_ALLEGIANCE,
			data: {
				_id,
				isFetching: true
			}
		});

	}

	render() {

		return (
            <App>
				<TransformerListContainer
					transformers={this.props.transformers}
					fetchTransformerAllegiance={this.fetchTransformerAllegiance}/>
            </App>
        );

    }

}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AppContainer);
