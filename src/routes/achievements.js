const express = require('express');
const {handleError} = require("../helpers/error");
const router = express.Router();
const AchievementProgressService = require('../services/AchievementProgressService');
const {getSubjectFromRequest} = require('../helpers/auth');

router.get('/', async (req, res, next) => {
    try {
        let {userId} = req.query || {};

        if (userId === 'me') {
            userId = getSubjectFromRequest(req);
        }

        let achievementList = await AchievementProgressService.listAll({userId});
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
