import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ParticipantDashboard from './Participant';
import TeacherDashboard from './Teacher';

function DashboardRoutes() {
	const userRole = useSelector((state) => state.auth.role);

	function testRole() {
		return userRole === 'PARTICIPANT' ? (
			<Redirect to='/dashboard/participant' />
		) : (
			<Redirect to='/dashboard/teacher' />
		);
	}

	function testRoleAndRedirect(role, Component) {
		console.log(userRole);
		const redirect = () => {
			return role === userRole ? (
				<Component />
			) : (
				<Redirect to='/dashboard' />
			);
		};
		return redirect;
	}

	return (
		<Switch>
			<Route
				path='/dashboard/participant'
				component={testRoleAndRedirect(
					'PARTICIPANT',
					ParticipantDashboard
				)}
			/>
			<Route
				path='/dashboard/teacher'
				component={testRoleAndRedirect(
					'TEACHER',
					TeacherDashboard
				)}
			/>

			<Route path='/dashboard' exact component={testRole} />
		</Switch>
	);
}

export default DashboardRoutes;
