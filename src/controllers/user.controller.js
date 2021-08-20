const express = require('express');
const router = express.Router();

const userService = require('../services/user.services');

// routes
router.post('/login', authenticate);
router.post('/register', register);

module.exports = router;

function authenticate(req, res, next) {
    userService.login(req.body)
        .then(user => user ? res.json({"payload": user}) : res.status(400).json({ message: 'email or password is incorrect' }))
        .catch(err => next(err));
};

function register(req, res, next) {
    userService.signup(req.body)
        .then((doc) => {
            return res.json({"payload": doc})
        })
        .catch(err => next(err));
};
