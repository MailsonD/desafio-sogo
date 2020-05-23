import React from 'react';

import './style.css';

function Button(props) {
	return (
		<button className='btn' {...props}>
			{props.text ? props.text : props.children}
		</button>
	);
}

export default Button;
