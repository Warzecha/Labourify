require('dotenv-flow').config();
const express = require('express');
const logger = require('morgan');

const cors = require('cors');

const mongoose = require('mongoose');
require('./models/OrganizationPermission');
require('./models/Organization');
require('./models/User');
require('./models/Integration');
require('./models/AchievementProgress');

const IndexController = require('./controllers/IndexController');
const UsersController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const WebhookController = require('./controllers/WebhookController');
const AchievementController = require('./controllers/AchievementController');
const OrganizationController = require('./controllers/OrganizationController');

const PORT = 8080;

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '5mb', extended: true},));
app.use(express.urlencoded({extended: false}));

app.options('*', cors());
app.use(cors());

app.use('/static', express.static('public'));

app.use('/', IndexController);
app.use('/users', UsersController);
app.use('/auth', AuthController);
app.use('/webhook', WebhookController);
app.use('/achievements', AchievementController);
app.use('/organizations', OrganizationController);


const connectToDatabase = () => {
    const {DATABASE_URL} = process.env;
    console.log('Connect to DB', DATABASE_URL);
    return mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
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
