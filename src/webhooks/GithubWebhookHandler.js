const AchievementProgressService = require('../services/AchievementProgressService');
const UsersService = require('../services/UsersService');


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

    const matchingUsers = await UsersService.getAllByGithubUsername(name);

    matchingUsers.forEach(u => {
        delete u.image;
    });

    console.debug('matchingUsers', matchingUsers);

    const matchingAchievements = ['beginner-commit-10'];

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
    });
};

module.exports = {handleEvent};
