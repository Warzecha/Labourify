const mongoose = require('mongoose');
const User = mongoose.model('User');

const experiencePointsRequiredForLevel = [-1, 0, 5, 10, 20, 50, 80, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 3000, 4000, 5000];

const incrementUserExperience = async (userId, experiencePoints) => {

    const user = await User.findById(userId).exec();

    let {
        totalExperiencePointsCollected,
        experienceLevel,
        currentExperiencePoints
    } = user;

    let gainedLevels = 0;

    let newExperiencePoints = currentExperiencePoints + experiencePoints;
    let isMaxLevel = experiencePointsRequiredForLevel.length === experienceLevel;

    if (!isMaxLevel) {
        let experienceForNextLevel = experiencePointsRequiredForLevel[experienceLevel + 1];

        while (!isMaxLevel && newExperiencePoints >= experienceForNextLevel) {
            newExperiencePoints -= experienceForNextLevel;
            experienceLevel++;
            gainedLevels++;

            experienceForNextLevel = experiencePointsRequiredForLevel[experienceLevel + 1];


        }
    }

    user.totalExperiencePointsCollected = totalExperiencePointsCollected + experiencePoints;
    user.experienceLevel = experienceLevel;
    user.currentExperiencePoints = newExperiencePoints;

    return user.save();
};


module.exports = {
    incrementUserExperience,
    experiencePointsRequiredForLevel
};
