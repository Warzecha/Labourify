const express = require('express');
const {handleError} = require('../helpers/error');
const router = express.Router();
const AchievementProgressService = require('../services/AchievementProgressService');

router.get('/', async (req, res, next) => {
    try {
        const achievementList = await AchievementProgressService.listAll();
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
