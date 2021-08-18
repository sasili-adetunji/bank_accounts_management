const express = require('express');
const router = express.Router();

const accountService = require('../services/account.services');

// routes
router.get('/', getAll);
router.post('/', createAccount);
// router.get('/:id', getByAccountId);

module.exports = router;

function getAll(req, res, next) {
    accountService.getAll(req.query.accountNumber)
        .then(users => res.json(users))
        .catch(err => next(err));
};

function createAccount(req, res, next) {
    accountService.createAccount(req.body.email)
        .then(users => res.json(users))
        .catch(err => next(err));
};
