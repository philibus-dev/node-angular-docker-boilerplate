const express = require('express'),
	router = express.Router(),
	{ requiresAuth } = require('express-openid-connect');

const user_controller = require('../../controllers/user.controller');

// Gets all users
router.get('/', requiresAuth(), user_controller.get_all_users);

// Gets logged-in user from Auth0
router.get('/currUser', user_controller.get_curr_user);

// Create new user
router.post('/', user_controller.create_user);

// Update user
router.put('/:id', user_controller.update_user);

// Delete user
router.delete('/:id', user_controller.delete_user);

module.exports = router;
