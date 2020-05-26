import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { newTeacher } from '../../../../store/Teacher/teacher.actions';
import * as Yup from 'yup';

import './style.css';
import {
	Card,
	CardContent,
	TextField,
	Button,
} from '@material-ui/core';

function NewTeacher() {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
			registration: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Digite um e-mail válido')
				.required('Preencha o campo de e-mail'),
			registration: Yup.string()
				.min(
					6,
					'A matricula deve ter no mínimo 3 caracteres'
				)
				.required('preencha o campo de matricula'),
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
			const teacher = { ...values };
			delete teacher.confirmPassword;
			console.log(teacher);
			dispatch(newTeacher(teacher));
		},
	});

	return (
		<div className='new-teacher'>
			<Card className='new-teacher-box'>
				<CardContent>
					<h2 className='title'>Novo Professor</h2>
					<form
						onSubmit={formik.handleSubmit}
						className='new-teacher-form'>
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
							name='registration'
							type='text'
							label='Matricula'
							variant='outlined'
							error={Boolean(formik.errors.registration)}
							helperText={formik.errors.registration}
							onChange={formik.handleChange}
							value={formik.values.registration}
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
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default NewTeacher;
