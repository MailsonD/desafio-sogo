import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerParticipant } from '../../../store/Auth/auth.actions';
import { TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';

import './style.css';
import { useHistory } from 'react-router-dom';

function Form() {
	const dispatch = useDispatch();
	const history = useHistory();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push('dashboard');
		}
	}, [auth.isAuthenticated]);

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
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email('Digite um e-mail válido')
				.required('Preencha o campo de e-mail'),
			name: Yup.string()
				.min(3, 'O nome deve ter no mínimo 3 caracteres')
				.required('Preencha o campo de nome'),
			password: Yup.string()
				.min(3, 'A senha deve ter no mínimo 3 caracteres')
				.required('Preencha o campo de senha'),
			confirmPassword: Yup.string()
				.oneOf(
					[Yup.ref('password'), null],
					'As senhas são diferentes'
				)
				.required('preencha a confirmação de senha'),
		}),
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
