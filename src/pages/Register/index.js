import React from 'react';

import './style.css';
import Input from '../../components/Input';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { registerParticipant } from '../../store/Auth/auth.actions';

function Register() {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: (values) => {
			const participant = { ...values };
			delete participant.confirmPassword;
			console.log(participant);
			dispatch(registerParticipant(participant));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Input
				name='email'
				type='email'
				title='Email'
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<Input
				name='name'
				type='text'
				title='Nome'
				onChange={formik.handleChange}
				value={formik.values.name}
			/>
			<Input
				name='password'
				type='password'
				title='Senha'
				onChange={formik.handleChange}
				value={formik.values.password}
			/>
			<Input
				name='confirmPassword'
				type='password'
				title='Confirmar Senha'
				onChange={formik.handleChange}
				value={formik.values.confirmPassword}
			/>
			<br />
			<Button type='submit'>Cadastrar</Button>
		</form>
	);
}

export default Register;
