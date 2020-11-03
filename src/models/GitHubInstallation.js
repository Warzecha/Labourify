const mongoose = require('mongoose');
const {throwErrorIfDoesNotExist} = require('../utils/MongooseUtils');
const {jsonFormatterPlugin} = require('../utils/MongooseUtils');

const {Schema} = mongoose;

const GitHubInstallationSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    installationId: {
        type: String,
        required: true
    },
    setupAction: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    gitHubUserLogin: {
        type: String,
    },
    gitHubUserId: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

mongoose.model('GitHubInstallation', GitHubInstallationSchema);

GitHubInstallationSchema.post('findOne', throwErrorIfDoesNotExist);
GitHubInstallationSchema.post('findOneAndDelete', throwErrorIfDoesNotExist);

GitHubInstallationSchema.plugin(jsonFormatterPlugin);
