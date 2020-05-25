import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	IconButton,
	Divider,
	Drawer,
} from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './style';
import { toogleMenu } from '../../store/Menu/menu.actions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function DrawerMenu() {
	const dispatch = useDispatch();

	const open = useSelector((state) => state.menu.open);
	const userRole = useSelector((state) => state.auth.role);
	const classes = useStyles();

	function handleDrawerClose() {
		console.log(userRole);
		dispatch(toogleMenu());
	}

	return (
		<Drawer
			variant='permanent'
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronRightIcon />
				</IconButton>
			</div>
			<Divider />
			<div></div>
		</Drawer>
	);
}

export default DrawerMenu;
