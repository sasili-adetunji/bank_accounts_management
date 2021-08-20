const db = require('../helpers/db');
const mongoose = require('mongoose');

require('dotenv').config();

const Account = db.Account;
const Transaction = db.Transaction;

module.exports = {
    createTransaction,
    getAllTransaction,
    getTransaction,
};

async function createTransaction(req) {

    const userId = req.userId
    const transactionParam = req.body
    // validate account exists and sender is the owner
    const { sender_account, receiver_account, amount } = transactionParam
    const sen_account = await Account.findOne({ accountNumber: sender_account, user: userId })
    if (!sen_account) {
        throw 'This account does not exist for the sender';
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

async function getAllTransaction() {
    return await Transaction.find();
}

async function getTransaction(account_number) {
    return await Transaction.find(
        { $or: [{ senderAccount: account_number }, 
            { receiverAccount: account_number }]
        });
};
