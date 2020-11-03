const express = require('express');
const router = express.Router();
const {handleError} = require("../helpers/error");
const GithubWebhookHandler = require('../services/integrations/GithubWebhookHandler');
const GitHubService = require('../services/integrations/GitHubService');
const {verifyTokenMiddleware} = require('../helpers/auth');
const {getSubjectFromRequest} = require('../helpers/auth');


router.get('/github/auth', async (req, res, next) => {
    console.log('GitHub auth', req.query);
    try {
        const {redirectUrl} = await GitHubService.acceptAuthRequest(req.query);
        res.redirect(redirectUrl);

    } catch (e) {
        next(e);
    }
});

router.post('/github/confirmation', verifyTokenMiddleware, async (req, res, next) => {
    console.log('GitHub confirmation', req.body);
    const userId = getSubjectFromRequest(req);

    try {
        const response = await GitHubService.handleGitHubAuthConfirmation(req.body, userId);
        res.json(response);
    } catch (e) {
        next(e);
    }
});


router.post('/github', async (req, res, next) => {

    console.log('GitHub integration', req.body);
    console.log('Headers', req.headers);

    const event = req.headers['x-github-event'];

    GithubWebhookHandler.handleEvent(event, req.body)
        .catch(err => {
            res.status(500).json({
                status: 'failure',
                message: err.message
            });
        });

    res.json({
        status: 'pending'
    });

});

router.use((err, req, res, next) => {
    handleError(err, res);
});


module.exports = router;
