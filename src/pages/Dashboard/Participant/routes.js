import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AllCourses from './AllCourses';
import Registrations from './Registrations';

function ParticipantRoutes() {
	return (
		<Switch>
			<Route
				path='/dashboard/participant/courses/all'
				exact
				component={AllCourses}
			/>
			<Route
				path='/dashboard/participant/courses/registred'
				exact
				component={Registrations}
			/>

			<Route
				path='/dashboard/participant'
				exact
				component={() => (
					<Redirect to='/dashboard/participant/courses/all' />
				)}
			/>
		</Switch>
	);
}

export default ParticipantRoutes;
