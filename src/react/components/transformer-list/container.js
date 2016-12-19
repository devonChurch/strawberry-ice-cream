import React, {Component} from 'react';
import TransformerList from './presentation';
import TransformerItemContainer from '../transformer-item/container';

class TransformerListContainer extends Component {

	renderTransformerItem(item) {

		const handleClick = () => {

			console.log(`cicked ${item.name}`);

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
