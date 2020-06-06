const mongoose = require('mongoose');

const {Schema} = mongoose;

const schema = new Schema({
    username: String,
    email: String,
    passwordHash: String,
    image: String,
    githubAccount: {
        username: String
    },
    slackAccount: {
        username: String
    }
});

mongoose.model('User', schema);
