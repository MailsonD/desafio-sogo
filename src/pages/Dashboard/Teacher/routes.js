import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import NewCourse from './NewCourse';
import NewTeacher from './NewTeacher';

function TeacherRoutes() {
	return (
		<Switch>
			<Route
				path='/dashboard/teacher/courses'
				exact
				component={TeacherCourses}
			/>
			<Route
				path='/dashboard/teacher/courses/new'
				component={NewCourse}
			/>
			<Route
				path='/dashboard/teacher/register'
				component={NewTeacher}
			/>

			<Route
				path='/dashboard/teacher'
				exact
				component={() => (
					<Redirect to='/dashboard/teacher/courses' />
				)}
			/>
		</Switch>
	);
}

export default TeacherRoutes;
