import React from 'react';

import './style.css';

import Form from './Form';

function Login() {
	return (
		<div className='main-login'>
			<div className='login-form-box'>
				<Form />
			</div>
			<div className='login-svg-box'></div>
		</div>
	);
}

export default Login;
