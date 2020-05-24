import React from 'react';
import DashboardRoutes from './routes';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/Auth/auth.actions';

function Dashboard() {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}

	return (
		<div>
			<Button onClick={handleLogout}>Logout</Button>
			<DashboardRoutes />
		</div>
	);
}

export default Dashboard;
