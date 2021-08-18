const mongoose = require('mongoose');
const userModel = require('../models/user.model')
const accountModel = require('../models/account.model')
const transactionModel = require('../models/transaction.model')

require('dotenv').config()


const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

if (process.env.NODE_ENV === 'testing') {
    mongoose.connect(process.env.MONGO_URI_TEST, connectionOptions);
    mongoose.Promise = global.Promise;
  } else {
        mongoose.connect(process.env.connectionString, connectionOptions);
        mongoose.Promise = global.Promise;
    }

module.exports = {
    User: userModel,
    Account: accountModel,
    Transaction: transactionModel
};