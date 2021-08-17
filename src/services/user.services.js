const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const accountNumber = require('../helpers/account_number')
const db = require('../helpers/db');
require('dotenv').config();

const User = db.User;
const Account = db.Account;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, process.env.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const user = new User(userParam);
        const account_no = accountNumber()
        
        // hash password
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
        console.log(error)
        await session.abortTransaction();
    }
    session.endSession();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
