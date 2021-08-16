let express = require('express');
let bodyParser = require('body-parser')
const cors = require('cors');
let userRoute = require('./controllers/users.controller')
const errorHandler = require('./helpers/errors');

let app = express();
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use('/users', userRoute);

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server is running on PORT ${PORT}`));
