const express = require('express'),
	router = express.Router();

const users = [
	{ id: 123, name: 'Charles Francis Xavier', email: 'professor.x@example.com' },
	{ id: 456, name: 'Scott Summers', email: 'cyclops@example.com' },
	{ id: 789, name: 'Robert Louis Drake', email: 'iceman@example.com' },
];

router.get('/', (req, res) => {
	res.status(200);
	res.json(users);
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const user = users.find((user) => user.id.toString() === id);

	if (user) {
		res.status(200);
		res.json(user);
	} else {
		res.status(404);
		res.json({ message: `User ${id} not found.` });
	}
});

router.post('/', (req, res) => {
	const { id, name, email } = req.body;

	if (!id || !name || !email) {
		res.status(400);
		res.json({
			message: 'Request did not contain id, name, or email address.',
		});
		return false;
	}

	const newUser = { id, name, email };

	users.push(newUser);

	res.status(200);
	res.json({ message: 'New user created.', newUser });
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	console.log(`users.js: deleting user with id of ${id}`);

	if (id) {
		console.log('users array is', users);
		// const indexOfUser = users.findIndex((obj) => obj.id === id);
		const indexOfUser = users.findIndex((user) => user.id.toString() === id);

		if (indexOfUser > -1) {
			users.splice(indexOfUser, 1);
			console.log('after delete, users array is', users);
			res.status(200);
			res.json({ message: `User ${id} deleted successfully.`, users });
		} else {
			console.log(`No user index with ID of ${id}.`);
			res.status(404);
			res.json({ message: `No user index with ID of ${id}.` });
		}
	} else {
		console.log(`Unable to delete user with ID of ${id}.`);
		res.status(404);
		res.json({ message: `Unable to delete user with ID of ${id}.` });
	}
});

module.exports = router;
