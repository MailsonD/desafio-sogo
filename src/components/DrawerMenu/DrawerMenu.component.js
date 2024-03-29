import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	IconButton,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './style';
import { toogleMenu } from '../../store/Menu/menu.actions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CreateIcon from '@material-ui/icons/Create';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';

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
				<h3 className={classes.title}>MENU</h3>
				<IconButton onClick={handleDrawerClose}>
					<ChevronRightIcon />
				</IconButton>
			</div>
			<Divider />
			{userRole === 'PARTICIPANT' ? (
				<ParticipantRoutes />
			) : (
				<TeacherRoutes />
			)}
		</Drawer>
	);
}

function TeacherRoutes() {
	const handleRedirect = useRedirect();

	return (
		<List>
			<ListItem
				button
				onClick={() =>
					handleRedirect('/dashboard/teacher/courses')
				}>
				<ListItemIcon>
					<ListAltIcon />
				</ListItemIcon>
				<ListItemText primary={'Meus minicursos'} />
			</ListItem>
			<ListItem
				button
				onClick={() =>
					handleRedirect('/dashboard/teacher/register')
				}>
				<ListItemIcon>
					<AssignmentIndIcon />
				</ListItemIcon>
				<ListItemText primary={'Novo Professor'} />
			</ListItem>
			<ListItem
				button
				onClick={() =>
					handleRedirect('/dashboard/teacher/courses/new')
				}>
				<ListItemIcon>
					<CreateIcon />
				</ListItemIcon>
				<ListItemText primary={'Novo Minicurso'} />
			</ListItem>
		</List>
	);
}

function ParticipantRoutes() {
	const handleRedirect = useRedirect();

	return (
		<List>
			<ListItem
				button
				onClick={() =>
					handleRedirect(
						'/dashboard/participant/courses/all'
					)
				}>
				<ListItemIcon>
					<ListAltIcon />
				</ListItemIcon>
				<ListItemText primary={'Minicursos disponíveis'} />
			</ListItem>
			<ListItem
				button
				onClick={() =>
					handleRedirect(
						'/dashboard/participant/courses/registred'
					)
				}>
				<ListItemIcon>
					<PlaylistAddCheckIcon />
				</ListItemIcon>
				<ListItemText primary={'Minhas inscrições'} />
			</ListItem>
		</List>
	);
}

function useRedirect() {
	const history = useHistory();

	function handleRedirect(route) {
		history.push(route);
	}

	return handleRedirect;
}

export default DrawerMenu;
