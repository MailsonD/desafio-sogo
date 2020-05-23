import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom';
import Login from './pages/Login';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
