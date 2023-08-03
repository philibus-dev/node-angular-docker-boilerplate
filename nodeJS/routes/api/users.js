const express = require('express'),
	router = express.Router(),
	UserRepo = require('../../classes/userRepo');

const userRepo = new UserRepo();

router.get('/', async (req, res) => {

	try {
		const allUsersResp = await userRepo.getAllUsers();

		if (allUsersResp) {
			res.status(200);
			res.json(allUsersResp);
		} else {
			res.status(500);
			res.json({message: 'Unable to get all users'})
		}

	} catch(err) {
		res.status(500);
		res.json({message: err})
	}

});

router.post('/', async (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) {
		res.status(400);
		res.json({
			message: 'Request did not contain id, name, or email address.',
		});
		return false;
	}

	await userRepo.addUser(name, email)
		.catch(err => {
			console.error(err);
			res.status(500);
			res.json({message: err.message});

			return false;
		});

	const allUsers = await userRepo.getAllUsers();

	res.status(200);
	res.json({ message: 'New user created.', users: allUsers });
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;

	if (id) {
		const editUserResp = await userRepo.editUser(id, {name: req.body.name, email: req.body.email});

		if (editUserResp && !editUserResp.err) {
			const allUsers = await userRepo.getAllUsers();

			res.status(200);
			res.json({ message: 'User updated', users: allUsers });
		} else {
			res.status(editUserResp.status);
			res.json({message: editUserResp.message});
		}
	} else {
		res.status(400);
		res.json({ message: `No id was passed` });
	}

})

router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	if (id) {
		const deleteUserResp = await userRepo.deleteUser(id);

		if (deleteUserResp && !deleteUserResp.err) {
			const allUsers = await userRepo.getAllUsers();

			res.status(200);
			res.json({ message: `User ${id} deleted successfully.`, users: allUsers });
		} else {
			res.status(deleteUserResp.status);
			res.json({message: deleteUserResp.message});
		}
	} else {
		res.status(404);
		res.json({ message: `You must specify an id for deletion` });
	}
});

module.exports = router;
