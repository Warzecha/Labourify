const mongoose = require('mongoose');
const AchievementProgress = mongoose.model('AchievementProgress');
const {achievementList} = require('./achievements');
const UserAchievementService = require('./UserAchievementService');

exports.updateProgress = async (userId, achievementId, {increaseScore}) => {
    const achievement = achievementList.find(({id}) => id === achievementId);
    const {targetScore, experiencePoints} = achievement;

    if (!achievement) {
        throw new Error(`Achievement with ID '${achievementId}' does not exist`);
    }

    const achievementProgress = await AchievementProgress.findOne({userId, achievementId}).exec();

    if (achievementProgress) {

        const newScore = achievementProgress.score + increaseScore;
        achievementProgress.score = newScore;

        if (newScore >= targetScore && !achievementProgress.obtainedAt) {
            achievementProgress.obtainedAt = new Date().toISOString();
            achievementProgress.experiencePointsCollected = experiencePoints;
            await UserAchievementService.incrementUserExperience(userId, experiencePoints);
        }

        return achievementProgress.save();

    } else {
        let toCreate = {
            userId: userId,
            achievementId: achievementId,
            score: increaseScore,
            targetScore: targetScore,
        };

        if (increaseScore >= targetScore) {
            toCreate.obtainedAt = new Date().toISOString();
            toCreate.experiencePointsCollected = experiencePoints;
            await UserAchievementService.incrementUserExperience(userId, experiencePoints);
        }

        return AchievementProgress.create(toCreate);
    }

};

exports.listAll = async (userId = null) => {
    if (userId) {
        const achievementProgressList = await AchievementProgress.find({userId}).exec();


        return achievementList.map(achievement => {
            const progress = achievementProgressList.find(({achievementId}) => achievementId === achievement.id);
            const {score = 0, obtainedAt = null} = progress || {};
            return {...achievement, score, obtainedAt};
        });


    } else {
        return achievementList;
    }
};
