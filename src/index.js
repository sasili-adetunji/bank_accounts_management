const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const auth = require('./helpers/jwt');
const accountRoute = require('./controllers/account.controller');
// const errorHandler = require('./helpers/errors');
const transactionRoute = require('./controllers/transaction.controller');
const userRoute = require('./controllers/user.controller');

require('dotenv').config();
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/account', auth.verify, accountRoute);
app.use('/transaction', auth.verify, transactionRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on PORT ${PORT}`));
