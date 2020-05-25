import React from 'react';
import DashboardRoutes from './routes';
import Topbar from '../../components/Topbar/Topbar.component';

import './style.css';

function Dashboard() {
	return (
		<div className='dashboard'>
			<Topbar />
			<DashboardRoutes />
		</div>
	);
}

export default Dashboard;
