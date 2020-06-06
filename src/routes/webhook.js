const express = require('express');
const {handleError} = require("../helpers/error");
const router = express.Router();
const GithubWebhookHandler = require('../webhooks/GithubWebhookHandler');

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
    ;


});

router.use((err, req, res, next) => {
    handleError(err, res);
});


module.exports = router;
