const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    passwordHash: {
        type: String
    },
});

mongoose.model('User', schema);
