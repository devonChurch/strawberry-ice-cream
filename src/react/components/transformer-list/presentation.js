import React, {PropTypes} from 'react';

function renderItem(item, i) {

	return (
		<li
			className="TransformerList-item"
			key={i}>
			{item}
		</li>
	);
}

function TransformerList(props) {

    return (
        <ul className="TransformerList">
			{props.items.map(renderItem)}
		</ul>
    );

}

export default TransformerList;
