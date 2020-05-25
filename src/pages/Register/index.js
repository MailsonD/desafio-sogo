import React from 'react';

import './style.css';
import Form from './Form';

function Register() {
	return (
		<div className='main-register'>
			<div className='register-svg-box'></div>
			<div className='register-form-box'>
				<Form />
			</div>
		</div>
	);
}

export default Register;
