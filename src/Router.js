import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import AuthRequired from './guard/authGuard';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/login' exact component={Login} />
				<Route
					path='/'
					render={() => <Redirect to='/login' />}
				/>
				<Route
					path='/dashboard'
					component={AuthRequired(Dashboard)}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
