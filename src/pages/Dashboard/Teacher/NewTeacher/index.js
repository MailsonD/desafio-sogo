import React from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { newTeacher } from '../../../../store/Teacher/teacher.actions';

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
		onSubmit: (values) => {
			const teacher = { ...values };
			delete teacher.confirmPassword;
			console.log(teacher);
			dispatch(newTeacher(teacher));
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
				name='registration'
				type='text'
				title='Matricula'
				onChange={formik.handleChange}
				value={formik.values.registration}
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

export default NewTeacher;
