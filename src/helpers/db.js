const mongoose = require('mongoose');
const config = require('../../config.json');
const userModel = require('../models/user.model')

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: userModel,
};