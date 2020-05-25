import React from 'react';
import Input from '../../../../components/Input';
import { useFormik } from 'formik';

function NewCourse() {
	const formik = useFormik({
		initialValues: {},
	});

	return (
		<div>
			<p>NewCourse</p>
			<form>
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
			</form>
		</div>
	);
}

export default NewCourse;
