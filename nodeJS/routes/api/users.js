const express = require('express'),
	router = express.Router(),
	UserRepo = require('../../classes/userRepo');

const userRepo = new UserRepo();

router.get('/', (req, res) => {
	res.status(200);
	res.json(userRepo.getAllUsers());
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const user = userRepo.getUser(id);

	if (user) {
		res.status(200);
		res.json(user);
	} else {
		res.status(404);
		res.json({ message: `User ${id} not found.` });
	}
});

router.post('/', (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) {
		res.status(400);
		res.json({
			message: 'Request did not contain id, name, or email address.',
		});
		return false;
	}

	userRepo.addUser(name, email);

	res.status(200);
	res.json({ message: 'New user created.', users: userRepo.getAllUsers() });
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	if (id) {
		const deleteUser = userRepo.deleteUser(id);

		if (deleteUser) {
			res.status(200);
			res.json({ message: `User ${id} deleted successfully.`, users: userRepo.getAllUsers() });
		} else {
			res.status(404);
			res.json({ message: `No user index with ID of ${id}.` });
		}
	} else {
		res.status(404);
		res.json({ message: `You must specify an id for deletion` });
	}
});

module.exports = router;
