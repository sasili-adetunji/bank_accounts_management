const express = require('express');
const router = express.Router();

const accountService = require('../services/account.services');

// routes
router.post('/', createAccount);
router.get('/', getAll);
router.get('/:id', getByAccountId);

module.exports = router;

function getByAccountId(req, res, next) {
    accountService.getByAccountId(req.params.id)
        .then(doc => res.json(doc))
        .catch(err => next(err));
};

function getAll(req, res, next) {
    accountService.getAll()
        .then(doc => res.json(doc))
        .catch(err => next(err));
};

function createAccount(req, res, next) {
    accountService.createAccount(req)
        .then(doc => res.json({"payload": doc, "message": "Account created successfully"}))
        .catch(err => next(err));
};
