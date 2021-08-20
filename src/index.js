const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const auth = require('./helpers/jwt');
const accountRoute = require('./controllers/account.controller');
const transactionRoute = require('./controllers/transaction.controller');
const userRoute = require('./controllers/user.controller');
const handleErrors = require('./helpers/error');

require('dotenv').config();
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/account', auth.verify, accountRoute);
app.use('/transaction', auth.verify, transactionRoute);
app.use('/', (req, res) => res.json({"message": "Welcome to the Banking Management Routes"}));

app.use(handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on PORT ${PORT}`));

module.exports = app;