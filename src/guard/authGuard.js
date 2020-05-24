import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AuthGuard(props) {
	const auth = useSelector((state) => state.auth);

	const history = useHistory();

	useEffect(() => {
		checkAuth();
	}, []);

	function checkAuth() {
		if (!auth.isAuthenticated) {
			history.push('/login');
		}
	}

	return (
		<div>{auth.isAuthenticated ? props.private : null}</div>
	);
}

function authRequired(component) {
	return <AuthGuard private={component} />;
}

export default authRequired;
