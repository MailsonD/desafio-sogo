import React, { useEffect } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import './style.css';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../store/Auth/auth.actions';

function Form() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const state = useSelector((state) => state);

	useEffect(() => {
		console.log(state);
	}, []);

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
		<>
			<form
				className='form-login'
				onSubmit={formik.handleSubmit}>
				<Input
					name='email'
					type='email'
					title='Email'
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<Input
					name='password'
					type='password'
					title='Senha'
					error='asasd'
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<Button type='submit'>Login</Button>
			</form>
			<br />
			<Button
				onClick={() => {
					dispatch({
						type: 'NEW_TEST',
						value: 'saaasd',
					});
				}}
			/>
			<Button
				onClick={() => {
					console.log(state);
				}}
			/>
		</>
	);
}

export default Form;
