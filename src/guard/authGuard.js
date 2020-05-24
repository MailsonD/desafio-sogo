import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AuthGuard(props) {
	const auth = useSelector((state) => state.auth);

	const history = useHistory();

	useEffect(() => {
		if (!auth.isAuthenticated) {
			history.push('/login');
		}
	}, [auth.isAuthenticated]);

	return (
		<div>{auth.isAuthenticated && props.children}</div>
	);
}

function authRequired(Component) {
	const AuthRequired = () => (
		<AuthGuard>
			<Component />
		</AuthGuard>
	);
	return AuthRequired;
}

export default authRequired;
