const mongoose = require('mongoose');
const axios = require('axios');
const GitHubInstallation = mongoose.model('GitHubInstallation');

const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
} = process.env;

const acceptAuthRequest = async (query) => {
    const {
        code,
        installation_id,
        setup_action
    } = query;

    const installation = new GitHubInstallation({
        code: code,
        installationId: installation_id,
        setupAction: setup_action
    }).save();

    axios.post('https://github.com/login/oauth/access_token', {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: 'http://localhost:8080/webhook/github/auth',
        // state: '',
    })
        .then(({data}) => {
            console.log('response', data);

        })
        .catch(err => {
            console.log('err', err);
        });

    return {
        redirectUrl: `http://localhost:3000/settings/integrations/github?installationId=${installation._id}`
    };
};

const handleGitHubAuthConfirmation = (request, userId) => {
    const {installationId} = request;
    console.log('Received account confirmation for installation: ', installationId);

    // GitHubInstallation

};

const handleInstallationEvent = (payload) => {

    const {action} = payload;

};


module.exports = {
    acceptAuthRequest,
    handleGitHubAuthConfirmation
};

