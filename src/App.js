import React from 'react';
import Router from './Router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';

import './global.css';
import Toastr from './components/Toastr';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className='main'>
					<Router />
				</div>
			</PersistGate>
			<Toastr />
		</Provider>
	);
}

export default App;
