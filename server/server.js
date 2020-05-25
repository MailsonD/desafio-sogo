const SECRET_KEY = '68914315';
const expiresIn = '2h';

const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');

const userdb = JSON.parse(
	fs.readFileSync('./server/users.json', 'UTF-8')
);

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/api/v1/auth/login', (req, res) => {
	const { email, password } = req.body;
	if (!isAuthenticated({ email, password })) {
		unauthorized(res, 'Email ou senha incorretos');
		return;
	}
	fs.readFile('./server/db.json', (err, data) => {
		var dbJson = JSON.parse(data.toString());

		const indexParticipant = dbJson.participant.findIndex(
			(p) => p.email === email
		);

		console.log(indexParticipant);

		let role;
		let id;
		if (indexParticipant !== -1) {
			role = 'PARTICIPANT';
			id = dbJson.participant[indexParticipant].id;
		} else {
			const indexTeacher = dbJson.teacher.findIndex(
				(t) => t.email === email
			);
			if (indexTeacher !== -1) {
				role = 'TEACHER';
				id = dbJson.teacher[indexTeacher].id;
			}
		}

		const token = createToken({ role, id });
		res.status(200).json({ token });
	});
});

function createToken(payload) {
	return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
	return jwt.verify(token, SECRET_KEY, (err, decode) =>
		decode !== undefined ? decode : err
	);
}
function isAuthenticated({ email, password }) {
	return (
		userdb.users.findIndex(
			(user) =>
				user.email === email && user.password === password
		) !== -1
	);
}

function isAlredyExists(email) {
	return (
		userdb.users.findIndex(
			(user) => user.email === email
		) !== -1
	);
}

function unauthorized(res, err) {
	const status = 401;
	const message = err;
	res.status(status).json({ status, message });
}

// Register New User
server.post('/api/v1/auth/register', (req, res) => {
	console.log('register endpoint called; request body:');
	const { email, password } = req.body;

	if (isAlredyExists(email)) {
		unauthorized(
			res,
			'O email informado já está cadastrado'
		);
		return;
	}

	if (req.body.register) {
		if (
			req.headers.authorization === undefined ||
			req.headers.authorization.split(' ')[0] !== 'Bearer'
		) {
			unauthorized(
				res,
				'Você não tem permissão para esta ação!'
			);
			return;
		}
		try {
			verifyToken(req.headers.authorization.split(' ')[1]);
		} catch (err) {
			const status = 401;
			const message = 'Token de acesso inválido';
			res.status(status).json({ status, message });
		}
	}

	let failed = false;

	let role;

	fs.readFile('./server/db.json', (err, data) => {
		if (err) {
			unauthorized(res, err);
			failed = true;
			return;
		}

		var dbJson = JSON.parse(data.toString());

		let dataArray;
		let last_item_id;
		if (req.body.registration) {
			dataArray = dbJson.teacher;
			last_item_id = dataArray[dataArray.length - 1].id;

			dataArray.push({
				id: last_item_id + 1,
				...req.body,
			});

			dbJson.teacher = dataArray;

			role = 'TEACHER';
		} else {
			dataArray = dbJson.participant;
			last_item_id = dataArray[dataArray.length - 1].id;

			dataArray.push({
				id: last_item_id + 1,
				...req.body,
			});

			dbJson.participant = dataArray;

			role = 'PARTICIPANT';
		}

		fs.writeFile(
			'./server/db.json',
			JSON.stringify(dbJson),
			(err, result) => {
				// WRITE
				if (err) {
					unauthorized(res, err);
					failed = true;
					return;
				}
			}
		);
	});

	if (failed) {
		return;
	}

	fs.readFile('./server/users.json', (err, data) => {
		if (err) {
			unauthorized(res, err);
			failed = true;
			return;
		}

		var usersJson = JSON.parse(data.toString());

		var last_item_id =
			usersJson.users[usersJson.users.length - 1].id;

		usersJson.users.push({
			id: last_item_id + 1,
			email: email,
			password: password,
		}); //add some data
		fs.writeFile(
			'./server/users.json',
			JSON.stringify(usersJson),
			(err, result) => {
				// WRITE
				if (err) {
					unauthorized(res, err);
					failed = true;
					return;
				}
			}
		);
	});

	if (failed) {
		return;
	}
	// Create token for new user
	const access_token = createToken({ email, password });
	console.log('Access Token:' + access_token);
	res.status(200).json({ access_token, role });
});

server.use(/^(?!\/api\/v1\/auth).*$/, (req, res, next) => {
	if (
		req.headers.authorization === undefined ||
		req.headers.authorization.split(' ')[0] !== 'Bearer'
	) {
		unauthorized(
			res,
			'Você não tem permissão para esta ação!'
		);
		return;
	}
	try {
		verifyToken(req.headers.authorization.split(' ')[1]);
		next();
	} catch (err) {
		unauthorized(res, 'Token de acesso inválido');
	}
});

server.use('/api/v1', router);

server.listen(8080, () => {
	console.log('Run Auth API Server');
});
