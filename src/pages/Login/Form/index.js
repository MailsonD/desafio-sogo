import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../store/Auth/auth.actions';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import logo from '../../../assets/logo.png';
import './style.css';

function Form() {
	const dispatch = useDispatch();
	const history = useHistory();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push('dashboard');
		}
	}, [auth.isAuthenticated]);

	function goToRegister() {
		history.push('/register');
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			console.log(auth);
			dispatch(loginUser(values.email, values.password));
			console.log(auth);
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='form-login'>
			<img src={logo} alt='Coursy' className='logo' />

			<br />
			<TextField
				name='email'
				type='email'
				label='Email'
				variant='outlined'
				error={Boolean(formik.errors.email)}
				helperText={formik.errors.email}
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<br />
			<TextField
				name='password'
				type='password'
				label='Senha'
				variant='outlined'
				error={formik.errors.password}
				onChange={formik.handleChange}
				value={formik.values.password}
			/>
			<br />
			<Button
				variant='contained'
				color='primary'
				type='submit'>
				Login
			</Button>
			<br />
			<Button
				type='button'
				variant='text'
				onClick={goToRegister}>
				CADASTRE-SE
			</Button>
		</form>
	);
}

export default Form;
