import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../CourseCard/CourseCard.component';

import './style.component.css';

function CourseRegistredList() {
	const [courses, setcourses] = useState([]);
	const allCouses = useSelector(
		(state) => state.courses.all
	);
	const userId = useSelector((state) => state.auth.id);

	useEffect(() => {
		setcourses(
			allCouses.data.filter((c) => {
				if (c.registrations) {
					return (
						c.registrations.findIndex(
							(r) => r.id === userId
						) !== -1
					);
				}
				return false;
			})
		);
	}, []);

	return (
		<>
			<div className='course-list'>
				{courses.length !== 0 && (
					<ListCards data={courses} />
				)}
			</div>
		</>
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

export default CourseRegistredList;
