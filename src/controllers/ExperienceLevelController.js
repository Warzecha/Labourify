const express = require('express');
const {handleError} = require('../helpers/error');
const router = express.Router();
const UserAchievementService = require('../services/UserAchievementService');

router.get('/levels', async (req, res, next) => {
    try {
        res.json(UserAchievementService.experiencePointsRequiredForLevel);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.use((err, req, res, next) => {
    handleError(err, res);
});


module.exports = router;
