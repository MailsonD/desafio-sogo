import React from 'react';
import DashboardRoutes from './routes';
import Topbar from '../../components/Topbar/Topbar.component';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu.component';

import './style.css';

function Dashboard() {
	return (
		<div className='dashboard'>
			<Topbar />
			<div className='content'>
				<DrawerMenu />
				<DashboardRoutes />
			</div>
		</div>
	);
}

export default Dashboard;
