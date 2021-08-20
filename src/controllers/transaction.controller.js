const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaction.services');

// routes
router.post('/', createTransaction);
router.get('/', getAllTransaction);
router.get('/:id', getTransaction);

module.exports = router;

function createTransaction(req, res, next) {
    transactionService.createTransaction(req)
        .then(() => res.json({"message": "Transaction Successful"}))
        .catch(err => next(err));
}

function getAllTransaction(req, res, next) {
    transactionService.getAllTransaction()
        .then(doc => res.json(doc))
        .catch(err => next(err));
}

function getTransaction(req, res, next) {
    transactionService.getTransaction(req.params.id)
        .then(doc => doc ? res.json(doc) : res.sendStatus(404))
        .catch(err => next(err));
}
