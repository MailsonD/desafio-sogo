import React from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';

import './global.css';

function App() {
	return (
		<Provider store={store}>
			<div className='main'>
				<Router />
			</div>
		</Provider>
	);
}

export default App;
