require('dotenv-flow').config();
const express = require('express');
const logger = require('morgan');

const cors = require('cors');

const mongoose = require('mongoose');
require('./models/User');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const {handleError} = require("./helpers/error");

const PORT = 8080;

const app = express();

app.options('*', cors());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);



const connectToDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};

const listen = () => {
    if (app.get('env') === 'test') return;
    app.listen(PORT, () => {
        console.log(`Log Panda app listening on port ${PORT}!`);
    });
};

mongoose.connection
    .on('error', console.log)
    .on('disconnected', connectToDatabase)
    .once('open', listen);


connectToDatabase();
