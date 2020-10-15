const express = require('express');
const OrganizationService = require('../services/OrganizationService');
const {verifyTokenMiddleware} = require('../helpers/auth');
const {handleError} = require('../helpers/error');
const router = express.Router();


router.post('/', verifyTokenMiddleware, async (req, res, next) => {
    try {
        const {auth} = req;
        const {data: {sub}} = auth;
        const response = await OrganizationService.createOrganization(req.body, sub);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.get('/:organizationId', async (req, res, next) => {
    try {
        const {organizationId} = req.params;
        const response = await OrganizationService.getById(organizationId);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});


router.get('/', async (req, res, next) => {
    try {
        let response = await OrganizationService.listAll();
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});


router.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = router;
