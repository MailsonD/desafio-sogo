import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/Auth/auth.actions';
import { toogleMenu } from '../../store/Menu/menu.actions';

import logo from '../../assets/logo_white.png';
import './style.component.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(
			['width', 'margin'],
			{
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}
		),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(
			['width', 'margin'],
			{
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}
		),
	},

	menuButton: {
		marginRight: 15,
	},
	hide: {
		display: 'none',
	},
}));

function Topbar() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const open = useSelector((state) => state.menu.open);

	function handleLogout() {
		dispatch(logoutUser());
	}

	function handleToogleMenu() {
		dispatch(toogleMenu());
	}

	return (
		<div className='app-bar'>
			<AppBar
				position='static'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar className='tool-bar'>
					<div className='start-bar'>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='menu'
							className={clsx(classes.menuButton, {
								[classes.hide]: open,
							})}
							onClick={handleToogleMenu}>
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
