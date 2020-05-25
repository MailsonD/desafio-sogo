import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherCourses } from '../../../../store/Course/course.actions';
import Button from '../../../../components/Button';

function TeacherCourses() {
	const courses = useSelector((state) => state.courses);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTeacherCourses());
	}, []);

	return (
		<div>
			<p>TeacherCourses</p>
			<Button onClick={() => console.log(courses)}>
				teste
			</Button>
		</div>
	);
}

export default TeacherCourses;
