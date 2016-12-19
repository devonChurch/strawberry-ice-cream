import React, {Component} from 'react';
import TransformerList from './presentation';

class TransformerListContainer extends Component {

	render() {

        return (
            <TransformerList {...this.props}/>
        );

    }

}

export default TransformerListContainer;
