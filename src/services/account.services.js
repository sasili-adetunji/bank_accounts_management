const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
require('dotenv').config();

const User = db.User;
const Account = db.Account;

module.exports = {
    getAll,
    getByAccountId,
    create,
    update,
    delete: _delete
};

async function getAll(accountNumber) {
    if (accountNumber) {
        return await Account.findOne({ accountNumber: accountNumber }, { accountNumber: 1 }).populate('user', { firstName: 1, email: 1 });
    }
    return await Account.find({}, { accountNumber: 1 }).populate('user', { firstName: 1, email: 1 });
}

async function getByAccountId(accountId) {
    return await Account.findOne({ accountNumber: accountId });
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    let min = Math.ceil(5111111111);
    let max = Math.floor(5999999999);
    let accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const ret = await user.save();
    let account = new Account({accountNumber: accountNumber, user: ret._id});
    let act = await account.save();

    // return {
    //     ...ret.toJSON(),
    //     ...act.accountNumber
    // };
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
