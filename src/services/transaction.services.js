const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const mongoose = require('mongoose');

require('dotenv').config();

const User = db.User;
const Account = db.Account;
const Transaction = db.Transaction;

module.exports = {
    createTransaction,
    getAllTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
};

async function createTransaction(transactionParam) {

    // validate that the sender is the owner of the account
    // through the use of JWT

    // validate account exists.
    const { sender_account, receiver_account, amount } = transactionParam
    const sen_account = await Account.findOne({ accountNumber: sender_account })
    if (!sen_account) {
        throw 'Sender account Does not exist';
    }
    const rec_account = await Account.findOne({ accountNumber: receiver_account })
    if (!rec_account) {
        throw 'Reciever account Does not exist';
    }

    // validate that the sender account has emough balance
    if ( amount > sen_account.accountBalance) {
        throw 'Insufficient Balance to carry out the transaction';
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        rec_account.accountBalance = rec_account.accountBalance + amount

        await rec_account.save()

        sen_account.accountBalance = sen_account.accountBalance - amount

        await sen_account.save()

        const trans = new Transaction({senderAccount: sender_account, 
            receiverAccount: receiver_account,
            transAmount: amount });

        await trans.save();

    } catch (error) {
        await session.abortTransaction();
    }
    session.endSession();
}

async function getAllTransaction(accountNumber) {
    // if (accountNumber) {
    //     return await Transaction.findOne();
    // }
    return await Transaction.find();
}

async function getTransaction(accountNumber) {
    return await Account.find({}, { accountNumber: 1 });
}

async function updateTransaction(accountNumber) {
    return await Account.find({}, { accountNumber: 1 });
}

async function deleteTransaction(accountNumber) {
    return await Account.find({}, { accountNumber: 1 });
}
