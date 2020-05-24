import React from 'react';
import TeacherRoutes from './routes';
import { Link } from 'react-router-dom';

function TeacherDashboard() {
	return (
		<div>
			<div>
				<Link to='/dashboard/teacher/courses'>
					Meus Cursos
				</Link>
				<Link to='/dashboard/teacher/courses/new'>
					Novo Curso
				</Link>
				<Link to='/dashboard/teacher/register'>
					Novo Professor
				</Link>
			</div>
			<br />
			<TeacherRoutes />
		</div>
	);
}

export default TeacherDashboard;
