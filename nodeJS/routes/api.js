const router = require('express').Router(),
    userRouter = require('./api/user');

router.use('/user', userRouter);

module.exports = router;