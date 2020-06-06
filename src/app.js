require('dotenv-flow').config();
const express = require('express');
const logger = require('morgan');

const cors = require('cors');

const mongoose = require('mongoose');
require('./models/User');
require('./models/Integration');
require('./models/AchievementProgress');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const webhookRouter = require('./routes/webhook');
const achievementsRouter = require('./routes/achievements');

const PORT = 8080;

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '5mb', extended: true},));
app.use(express.urlencoded({extended: false}));

app.options('*', cors());
app.use(cors());

app.use('/static', express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/webhook', webhookRouter);
app.use('/achievements', achievementsRouter);


const connectToDatabase = () => {
    return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};

const listen = () => {
    if (app.get('env') === 'test') return;
    app.listen(PORT, () => {
        console.log(`Labourification app listening on port ${PORT}!`);
    });
};

mongoose.connection
    .on('error', console.log)
    .on('disconnected', connectToDatabase)
    .once('open', listen);


connectToDatabase();
