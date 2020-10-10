const express = require('express');
const UsersService = require('../services/UsersService');
const AchievementProgressService = require('../services/AchievementProgressService');
const {verifyTokenMiddleware, getSubjectFromRequest} = require('../helpers/auth');
const {handleError} = require('../helpers/error');
const router = express.Router();

router.get('/me', verifyTokenMiddleware, async (req, res, next) => {
    try {
        const {
            auth: {
                data: {sub}
            }
        } = req;

        let response = await UsersService.getById(sub);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});


router.get('/:userId', async (req, res, next) => {
    try {
        let userId = req.params.userId;
        let response = await UsersService.getById(userId);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});


router.get('/', async (req, res, next) => {
    try {
        let response = await UsersService.listAll();
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.put('/:userId', verifyTokenMiddleware, async (req, res, next) => {
    try {
        let {userId} = req.params;

        if (userId === 'me') {
            userId = getSubjectFromRequest(req);
        }

        let response = await UsersService.update(userId, req.body);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.get('/:userId/achievements', verifyTokenMiddleware, async (req, res, next) => {
    try {
        let {userId} = req.params;

        if (userId === 'me') {
            userId = getSubjectFromRequest(req);
        }

        let achievementList = await AchievementProgressService.listAll(userId);
        res.json(achievementList);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});


router.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = router;
