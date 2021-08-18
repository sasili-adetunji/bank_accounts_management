const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const accountNumber = require('../helpers/account_number')
const db = require('../helpers/db');
const jwt = require('../helpers/jwt');

require('dotenv').config();

const User = db.User;
const Account = db.Account;

module.exports = {
    login,
    signup,
};

async function login({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function signup(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const user = new User(userParam);
        const account_no = accountNumber()
        
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        user.accounts.push(account_no)
        const us = await user.save();

        let account = new Account({
            accountNumber: account_no,
            user: us._id           
        });
        const b = await account.save();
        await session.commitTransaction();

        return {
            ...us.toJSON(),
            // accountNumber: account.accountNumber
        };
    } catch (error) {
        await session.abortTransaction();
    }
    session.endSession();
};
