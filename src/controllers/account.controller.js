const express = require('express');
const router = express.Router();

const accountService = require('../services/account.services');

// routes
router.get('/', getAll);
router.post('/', createAccount);
// router.get('/:id', getByAccountId);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    accountService.getAll(req.query.accountNumber)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function createAccount(req, res, next) {
    accountService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

// function getByAccountId(req, res, next) {
//     accountService.getByAccountId(req.query.accountId)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

function update(req, res, next) {
    accountService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    accountService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}