const router = require('express').Router(),
	usersRouter = require('./api/users');

router.use('/users', usersRouter);

module.exports = router;
