import React, { useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard.component';

import './style.component.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../../store/Course/course.actions';
import { CircularProgress } from '@material-ui/core';

function CourseList() {
	const dispatch = useDispatch();
	const { isFetching, all } = useSelector(
		(state) => state.courses
	);

	useEffect(() => {
		console.log('epa');
		console.log(all.data.length);
		dispatch(fetchAllCourses());
	}, []);

	return (
		<div className='course-list'>
			{all.data.length !== 0 && isFetching ? (
				<CircularProgress />
			) : (
				<ListCards data={all.data} />
			)}
		</div>
	);
}

function ListCards(props) {
	return (
		<>
			{props.data.map((course) => (
				<CourseCard key={course.id} data={course} />
			))}
		</>
	);
}

export default CourseList;
