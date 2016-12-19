import React, {PropTypes} from 'react';

function renderItem(item, i) {

	return (
		<li key={i}>
			{item}
		</li>
	);
}

function TransformerList(props) {

    return (
        <ul>
			{props.items.map(renderItem)}
		</ul>
    );

}

export default TransformerList;
