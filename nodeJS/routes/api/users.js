const express = require('express'),
	router = express.Router(),
	{ requiresAuth } = require('express-openid-connect');

const user_controller = require('../../controllers/user.controller');
const UserController = new user_controller();

// Gets all users
router.get('/', requiresAuth(), UserController.get_all_users);


// Gets logged-in user from Auth0
router.get('/currUser', UserController.get_curr_user);

// Create new user
router.post('/', UserController.create_user);

// Update user
router.put('/:id', UserController.update_user);

// Delete user
router.delete('/:id', UserController.delete_user);

module.exports = router;
