import React from 'react';

import './style.css';

function Input(props) {
	return (
		<div className='input-box'>
			<span className='input-title'>{props.title}</span>
			<input className='input' {...props} />
			{props.error && (
				<span className='error-message'>{props.error}</span>
			)}
		</div>
	);
}

export default Input;
