import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from '../CourseCard/CourseCard.component';
import { CircularProgress } from '@material-ui/core';
import { fetchTeacherCourses } from '../../store/Course/course.actions';

function TeacherCoursesList() {
	const dispatch = useDispatch();
	const { isFetching, teacherCourses } = useSelector(
		(state) => state.courses
	);

	useEffect(() => {
		dispatch(fetchTeacherCourses());
	}, []);

	return (
		<>
			<div className='course-list'>
				{teacherCourses.data.length !== 0 && isFetching ? (
					<CircularProgress />
				) : (
					<ListCards data={teacherCourses.data} />
				)}
			</div>
		</>
	);
}

function ListCards(props) {
	return (
		<>
			{props.data.map((course) => (
				<CourseCard key={course.id} data={course} teacher />
			))}
		</>
	);
}

export default TeacherCoursesList;
