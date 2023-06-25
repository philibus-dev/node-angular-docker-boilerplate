const express = require('express'),
    router = express.Router();

const users = [
    {id: '123', name: 'John Doe1', email: 'jdoe1@example.com'},
    {id: '456', name: 'John Doe2', email: 'jdoe2@example.com'},
    {id: '789', name: 'John Doe3', email: 'jdoe3@example.com'}
]

router.get('/', (req, res) => {

    res.status(200);
    res.json(users);

});

router.get('/:id', (req, res) => {
    // const req.body.id;

    res.status(200);
    res.json(users);

});

module.exports = router;
