import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
	// KeyboardDatePicker,
	KeyboardTimePicker,
	KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {
	TextField,
	Button,
	Slider,
	Typography,
	Input,
} from '@material-ui/core';
import { newCourse } from '../../../../store/Course/course.actions';

function NewCourse() {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			name: '',
			realization_date: new Date(),
			duration: new Date(),
			vacancies: 30,
		},
		onSubmit: (values) => {
			console.log(values);
			dispatch(newCourse(values));
		},
	});

	return (
		<div>
			<p>NewCourse</p>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					name='name'
					label='Nome'
					variant='outlined'
					value={formik.values.name}
					onChange={formik.handleChange}
				/>
				<KeyboardDateTimePicker
					ampm={false}
					inputVariant='outlined'
					variant='inline'
					format='dd/MM/yyyy HH:mm'
					label='Data do minicurso'
					value={formik.values.realization_date}
					disablePast
					onChange={(date) => {
						formik.setFieldValue('realization_date', date);
					}}
				/>

				<KeyboardTimePicker
					ampm={false}
					variant='inline'
					inputVariant='outlined'
					label='Duração'
					value={formik.values.duration}
					onChange={(date) => {
						formik.setFieldValue('duration', date);
					}}
				/>

				<Typography id='discrete-slider' gutterBottom>
					Vagas
				</Typography>
				<Slider
					defaultValue={30}
					aria-labelledby='discrete-slider'
					valueLabelDisplay='auto'
					name='vacancies'
					value={formik.values.vacancies}
					onChange={formik.handleChange}
					min={1}
					max={100}
				/>

				<Button
					variant='contained'
					color='primary'
					type='submit'>
					Cadastrar curso
				</Button>
			</form>
		</div>
	);
}

export default NewCourse;
