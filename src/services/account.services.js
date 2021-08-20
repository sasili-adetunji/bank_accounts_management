const db = require('../helpers/db');
const accountNumber = require('../helpers/account_number')
require('dotenv').config();

const User = db.User;
const Account = db.Account;

module.exports = {
    getByAccountId,
    createAccount,
    getAll,
};

async function getAll() {
    return await Account.find({}, { accountNumber: 1, accountBalance: 1 }).populate('user', { firstName: 1, email: 1 });
}

async function getByAccountId(accountId) {
    const account = await Account.findOne({ accountNumber: accountId })
    if (!account) {
        throw 'This account does not exist';
    }
    return await Account.findOne({ accountNumber: accountId },  { accountNumber: 1, accountBalance: 1 }).populate('user', { firstName: 1, email: 1 });
}

async function createAccount(req) {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) {
        throw new Error('User does not exist')
    }
    if (await Account.countDocuments({ user: userId }) >= 4 ) {
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
