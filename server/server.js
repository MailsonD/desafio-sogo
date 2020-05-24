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

server.post('api/v1/auth/login', async (req, res) => {
	const { email, password } = req.body;
	if (isAuthenticated({ email, password }) === false) {
		const status = 401;
		const message = 'Incorrect email or password';
		res.status(status).json({ status, message });
		return;
	}
	fs.readFile('./server/db.json', (err, data) => {
		var dbJson = JSON.parse(data.toString());

		const indexParticipant = dbJson.participant.findIndex(
			(p) => p.email === email
		);

		console.log(indexParticipant);

		let type;
		if (indexParticipant !== -1) {
			type = 'PARTICIPANT';
		} else {
			const indexTeacher = dbJson.teacher.findIndex(
				(t) => t.email === email
			);
			if (indexTeacher !== -1) {
				type = 'TEACHER';
			}
		}

		const token = createToken({ email, password });
		res.status(200).json({ token, type });
	});
});

// Create a token from a payload
function createToken(payload) {
	return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
	return jwt.verify(token, SECRET_KEY, (err, decode) =>
		decode !== undefined ? decode : err
	);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
	return (
		userdb.users.findIndex(
			(user) =>
				user.email === email && user.password === password
		) !== -1
	);
}

function unauthorized(res, err) {
	const status = 401;
	const message = err;
	res.status(status).json({ status, message });
}

// Register New User
server.post('api/v1/auth/register', (req, res) => {
	console.log('register endpoint called; request body:');
	const { email, password } = req.body;

	if (isAuthenticated({ email, password }) === true) {
		unauthorized(res, 'Email and Password already exist');
		return;
	}

	if (req.body.register) {
		if (
			req.headers.authorization === undefined ||
			req.headers.authorization.split(' ')[0] !== 'Bearer'
		) {
			unauthorized(res, 'Bad authorization header');
			return;
		}
		try {
			verifyToken(req.headers.authorization.split(' ')[1]);
		} catch (err) {
			const status = 401;
			const message = 'Error: access_token is not valid';
			res.status(status).json({ status, message });
		}
	}

	let failed = false;

	fs.readFile('./server/db.json', (err, data) => {
		if (err) {
			unauthorized(res, err);
			failed = true;
			return;
		}

		var dbJson = JSON.parse(data.toString());

		let dataArray;
		let last_item_id;
		if (req.body.register) {
			dataArray = dbJson;
			last_item_id = dataArray[dataArray.length - 1].id;

			dataArray.push({
				id: last_item_id + 1,
				...req.body,
			});

			dbJson.teacher = dataArray;
		} else {
			dataArray = dbJson.participant;
			last_item_id = dataArray[dataArray.length - 1].id;

			dataArray.push({
				id: last_item_id + 1,
				...req.body,
			});

			dbJson.participant = dataArray;
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
	res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
	if (
		req.headers.authorization === undefined ||
		req.headers.authorization.split(' ')[0] !== 'Bearer'
	) {
		unauthorized(res, 'Bad authorization header');
		return;
	}
	try {
		verifyToken(req.headers.authorization.split(' ')[1]);
		next();
	} catch (err) {
		unauthorized(res, 'Error: access_token is not valid');
	}
});

server.use('/api/v1', router);

server.listen(8080, () => {
	console.log('Run Auth API Server');
});
