import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Button,
} from '@material-ui/core';

import './style.component.css';
import { formatToBrLocale } from '../../util/data-format';
import { formatDurationToBr } from '../../util/interval-format';
import { useSelector, useDispatch } from 'react-redux';
import { requestRegistration } from '../../store/Course/course.actions';

function CourseCard(props) {
	const dispatch = useDispatch();

	const registring = useSelector(
		(state) => state.courses.registring
	);
	const [date, setDate] = useState('');
	const [registrations] = useState(
		props.data.registrations
			? props.data.registrations.length
			: 0
	);
	const [vacancies] = useState(props.data.vacancies);

	const isRegistred = useRegistrationTest(props.data);

	useEffect(() => {
		console.log(registring);
		setDate(
			formatToBrLocale(
				new Date(props.data.realization_date)
			)
		);
	}, []);

	function getDate() {
		return date.split('T')[0];
	}

	function getTime() {
		return date.split('T')[1];
	}

	function handleRegistration() {
		dispatch(requestRegistration(props.data));
	}

	return (
		<Card className='card-box'>
			<CardContent>
				<div className='card-top'>
					<p className='vacations'>
						Vagas:{' '}
						{formatVacancies(registrations, vacancies)}
					</p>
					<span className='card-date'>{getDate()}</span>
				</div>
				<h2>{props.data.name}</h2>
			</CardContent>
			<CardActions className='card-actions'>
				<div className='card-bottom'>
					<span>Início: {getTime()}</span>
					<span>
						Duração:{' '}
						{formatDurationToBr(props.data.duration)}
					</span>
				</div>
				{!isRegistred ? (
					<Button
						variant='contained'
						color='primary'
						onClick={handleRegistration}
						disabled={
							registrations === vacancies ||
							registring.isRegistring
						}>
						Inscrever-se
					</Button>
				) : (
					<h4 className='registred'>INSCRITO</h4>
				)}
			</CardActions>
		</Card>
	);
}

function formatVacancies(registrations, vacancies) {
	return vacancies > registrations ? (
		<span className='course-avaliable'>{`${registrations}/${vacancies}`}</span>
	) : (
		<span className='course-full'>{`${registrations}/${vacancies}`}</span>
	);
}

function useRegistrationTest(course) {
	const userId = useSelector((state) => state.auth.id);

	if (course.registrations) {
		return (
			course.registrations.findIndex(
				(r) => r.id === userId
			) !== -1
		);
	}

	return false;
}

export default CourseCard;
