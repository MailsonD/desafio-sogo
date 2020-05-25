import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './style.component.css';

import logo from '../../assets/logo_white.png';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/Auth/auth.actions';

function Topbar() {
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logoutUser());
	}

	return (
		<div className='app-bar'>
			<AppBar position='static'>
				<Toolbar className='tool-bar'>
					<div className='start-bar'>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='menu'>
							<MenuIcon />
						</IconButton>
						<img src={logo} className='top-bar-logo' />
					</div>
					<div className='btn-logout'>
						<Button color='inherit' onClick={handleLogout}>
							Sair
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Topbar;
