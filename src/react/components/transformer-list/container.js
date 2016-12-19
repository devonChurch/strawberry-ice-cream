import React, {Component} from 'react';
import TransformerList from './presentation';
import TransformerItemContainer from '../transformer-item/container';

class TransformerListContainer extends Component {

	constructor() {

		super();
		this.renderTransformerItem = this.renderTransformerItem.bind(this);

	}

	renderTransformerItem(item) {


		const handleClick = () => {

			console.log('renderTransformerItem | this', this);

			console.log(`cicked ${item.name}`);

			this.props.fetchTransformerAllegiance(item._id);

		}

		return (
			<TransformerItemContainer
				id={item._id}
				name={item.name}
				isAutobot={item.isAutobot}
				handleClick={handleClick}/>
		);

	}

    render() {



        return (
            <TransformerList
				items={this.props.transformers.map(this.renderTransformerItem)}/>
        );

    }

}

export default TransformerListContainer;
