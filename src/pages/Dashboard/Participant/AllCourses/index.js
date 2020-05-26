import React from 'react';
import CourseList from '../../../../components/CourseList/CourseList.component';

import './style.css';

function AllCourses() {
	return (
		<div>
			<h1 className='title'>Cursos disponíveis</h1>
			<CourseList />
		</div>
	);
}

export default AllCourses;
