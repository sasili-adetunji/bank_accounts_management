const express = require('express');
const router = express.Router();
const userService = require('../services/transaction.services');

// routes
router.post('/', createTransaction);
router.get('/', getAllTransaction);
router.get('/:id', getTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;

function createTransaction(req, res, next) {
    userService.createTransaction(req.body)
        .then(() => res.json({"message": "Transaction Successful"}))
        .catch(err => next(err));
}

function getAllTransaction(req, res, next) {
    userService.getAllTransaction()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getTransaction(req, res, next) {
    userService.getTransaction(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateTransaction(req, res, next) {
    userService.updateTransaction(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteTransaction(req, res, next) {
    userService.deleteTransaction(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
