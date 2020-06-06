const mongoose = require('mongoose');
const AchievementProgress = mongoose.model('AchievementProgress');
const {achievementList} = require('./achievements');

exports.updateProgress = async (userId, achievementId, {increaseScore}) => {

    const achievement = achievementList.find(({id}) => id === achievementId);

    const {targetScore} = achievement;

    if (!achievement) {
        throw new Error(`Achievement with ID '${achievementId}' does not exist`);
    }

    const achievementProgress = await AchievementProgress.findOne({userId, achievementId}).exec();

    if (achievementProgress) {

        const newScore = achievementProgress.score + increaseScore;
        achievementProgress.score = newScore;

        if (newScore >= targetScore) {
            achievementProgress.obtainedAt = new Date().toISOString();
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
        }

        return AchievementProgress.create(toCreate);
    }

};

exports.listAll = async ({userId}) => {
    if (userId) {

        if (userId === 'me') {

        }

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
