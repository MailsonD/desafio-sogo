import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerParticipant } from '../../../store/Auth/auth.actions';
import { TextField, Button } from '@material-ui/core';

import './style.css';
import { useHistory } from 'react-router-dom';

function Form() {
	const dispatch = useDispatch();
	const history = useHistory();

	function goBack() {
		history.goBack();
	}

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
		<form
			onSubmit={formik.handleSubmit}
			className='form-register'>
			<h1 className='form-register-title'>CADASTRO</h1>
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
				name='name'
				type='text'
				label='Nome'
				variant='outlined'
				error={Boolean(formik.errors.name)}
				helperText={formik.errors.name}
				onChange={formik.handleChange}
				value={formik.values.name}
			/>
			<br />
			<TextField
				name='password'
				type='password'
				label='Senha'
				variant='outlined'
				error={Boolean(formik.errors.password)}
				helperText={formik.errors.password}
				onChange={formik.handleChange}
				value={formik.values.password}
			/>
			<br />
			<TextField
				name='confirmPassword'
				type='password'
				label='Confirmar Senha'
				variant='outlined'
				error={Boolean(formik.errors.confirmPassword)}
				helperText={formik.errors.confirmPassword}
				onChange={formik.handleChange}
				value={formik.values.confirmPassword}
			/>
			<br />
			<Button
				variant='contained'
				color='primary'
				type='submit'>
				CADASTRAR
			</Button>
			<br />
			<Button type='button' variant='text' onClick={goBack}>
				VOLTAR
			</Button>
		</form>
	);
}

export default Form;
