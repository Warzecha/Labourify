const AchievementProgressService = require('../AchievementProgressService');
const UsersService = require('../UserService');
const moment = require('moment');


const handleEvent = async (event, payload) => {


    switch (event) {
        case 'create':
            return handleCreateFileEvent(payload);
        case 'push':
            return handlePushEvent(payload);

        default:
            return null;
    }

};


const handleCreateFileEvent = (payload) => {


};

const handlePushEvent = async (payload) => {

    const {
        commits = [],
        pusher
    } = payload;

    const {
        name
    } = pusher || {};

    const commitCount = commits.length;


    let isAtNight = commits
        .map(({timestamp}) => moment(timestamp))
        .map((commitTime) => commitTime.isBetween(commitTime.hour(0).minute(0).second(0),
            commitTime.hour(5).minute(0).second(0)))
        .find(value => value === true);

    const matchingUsers = await UsersService.getAllByGithubUsername(name);

    matchingUsers.forEach(u => {
        delete u.image;
    });

    console.debug('matchingUsers', matchingUsers);

    const matchingAchievements = ['beginner-commit-10', 'intermediate-commit-100', 'advanced-commit-1000'];

    matchingUsers.forEach(user => {
        matchingAchievements.forEach(achievement => {
            AchievementProgressService.updateProgress(user.id, achievement, {increaseScore: commitCount})
                .then(res => {
                    console.log('Updated achievement progress', res);
                })
                .catch(err => {
                    console.error('Failed to update achievement progress');
                    console.error(err);
                });
        });

        if (isAtNight) {
            AchievementProgressService.updateProgress(user.id, 'burning-the-midnight-oil', {increaseScore: 1})
                .then(res => {
                    console.log('Updated achievement progress', res);
                })
                .catch(err => {
                    console.error('Failed to update achievement progress');
                    console.error(err);
                });
        }

    });


};

module.exports = {handleEvent};
