const db = require('../helpers/db');
const accountNumber = require('../helpers/account_number')
require('dotenv').config();

const User = db.User;
const Account = db.Account;

module.exports = {
    getAll,
    getByAccountId,
    createAccount,
};

async function getAll(accountNumber) {
    if (accountNumber) {
        return await Account.findOne({ accountNumber: accountNumber }, { firstName: 1 }).populate('user', { getFullName: 1, email: 1 });
    }
    return await Account.find({}, { accountNumber: 1 }).populate('user', { firstName: 1, email: 1 });
}

async function getByAccountId(accountId) {
    return await Account.findOne({ accountNumber: accountId });
}

async function createAccount(email) {
    const user = await User.findOne({email: email});
    if (!user) {
        throw new Error('User does not exist')
    }
    if (await Account.find({ user: user._id }).count() > 4 ) {
        throw "Maximum number of account created"
    }
    
    const account_no = accountNumber()
    const account = new Account({accountNumber: account_no, user: user._id});

    user.accounts.push(account_no)

    await account.save();
    await user.save();

    return {
        accountNumber: account.accountNumber
    };
};
