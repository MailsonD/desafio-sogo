import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom';
import authRequired from './guard/authGuard';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route
					path='/dashboard'
					component={authRequired(Dashboard)}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
