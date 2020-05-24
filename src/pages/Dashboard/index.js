import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { logoutUser } from '../../store/Auth/auth.actions';

function Dashboard() {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}

	return (
		<div>
			<p>Dashboard</p>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export default Dashboard;
