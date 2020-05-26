import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
	KeyboardTimePicker,
	KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {
	TextField,
	Button,
	Slider,
	Typography,
	Card,
	CardContent,
} from '@material-ui/core';
import * as Yup from 'yup';
import {
	newCourse,
	fetchAllCourses,
} from '../../../../store/Course/course.actions';

import './style.css';

function NewCourse() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllCourses());
	}, []);

	const formik = useFormik({
		initialValues: {
			name: '',
			realization_date: new Date(),
			duration: new Date(),
			vacancies: 30,
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.min(3, 'O nome deve ter no mínimo 3 caracteres')
				.required('Preencha o campo de nome'),
			realization_date: Yup.date().required(
				'Preencha a data de realização'
			),
			duration: Yup.date().required(
				'Preencha a duração do minicurso'
			),
		}),
		onSubmit: (values) => {
			console.log(values);
			dispatch(newCourse(values));
		},
	});

	return (
		<div className='new-course'>
			<Card className='new-course-box'>
				<CardContent>
					<h2 className='title'>Novo Curso</h2>
					<form
						onSubmit={formik.handleSubmit}
						className='new-course-form'>
						<TextField
							name='name'
							label='Nome'
							variant='outlined'
							value={formik.values.name}
							onChange={formik.handleChange}
							error={Boolean(formik.errors.name)}
							helperText={formik.errors.name}
						/>
						<br />
						<KeyboardDateTimePicker
							ampm={false}
							inputVariant='outlined'
							variant='inline'
							format='dd/MM/yyyy HH:mm'
							label='Data do minicurso'
							value={formik.values.realization_date}
							error={Boolean(
								formik.errors.realization_date
							)}
							helperText={formik.errors.realization_date}
							disablePast
							onChange={(date) => {
								formik.setFieldValue(
									'realization_date',
									date
								);
							}}
						/>
						<br />
						<KeyboardTimePicker
							ampm={false}
							variant='inline'
							inputVariant='outlined'
							label='Hora de término'
							value={formik.values.duration}
							error={Boolean(formik.errors.duration)}
							helperText={formik.errors.duration}
							onChange={(date) => {
								formik.setFieldValue('duration', date);
							}}
						/>
						<br />
						<Typography id='discrete-slider' gutterBottom>
							Vagas
						</Typography>
						<Slider
							defaultValue={30}
							aria-labelledby='discrete-slider'
							valueLabelDisplay='auto'
							value={formik.values.vacancies}
							onChange={(change, value) => {
								formik.setFieldValue('vacancies', value);
							}}
							min={1}
							max={100}
						/>
						<br />
						<Button
							variant='contained'
							color='primary'
							type='submit'>
							Cadastrar curso
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default NewCourse;
