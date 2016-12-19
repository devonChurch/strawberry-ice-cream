import React, {PropTypes} from 'react';

function setAllegiance(props) {

	switch (props.isFetched) {

		case true:
			return props.isAutobot ? 'autobot' : 'decepticon';

		default:
			return 'unknown';

	}

}

function TransformerItem(props) {

	const handleClick = props.isFetched || props.isFetching ? false : props.handleClick;

    return (
        <a onClick={handleClick}>
			<h2>Name: {props.name}</h2>
			<p>Is Autobot? {setAllegiance(props)}</p>
		</a>
    );

}

export default TransformerItem;
