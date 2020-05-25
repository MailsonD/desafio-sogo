import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { ThemeProvider } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import theme from './theme';
import Router from './Router';

import './global.css';
import Toastr from './components/Toastr';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<div className='main'>
							<Router />
						</div>
					</MuiPickersUtilsProvider>
				</ThemeProvider>
			</PersistGate>
			<Toastr />
		</Provider>
	);
}

export default App;
