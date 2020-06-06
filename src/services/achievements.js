const achievementList = [
    {
        id: 'beginner-commit-10',
        name: 'Beginner commit',
        description: 'Submit a commit 10 times',
        targetScore: 10,
        image: '/static/images/badges/beginner-commit.png'
    },
    {
        id: 'photogenic',
        name: 'Photogenic',
        description: 'Upload profile photo',
        targetScore: 1,
        image: '/static/images/badges/photogenic.png'
    },
    {
        id: 'github-integration',
        name: 'GitHub',
        description: 'Add your GitHub username od something else or even nothing',
        targetScore: 1,
        image: '/static/images/badges/github-integration.png'
    },
    {
        id: 'slack-integration',
        name: 'Slack',
        description: 'Add your Slack username',
        targetScore: 1,
        image: '/static/images/badges/slack-integration.png'
    }
];

module.exports = {
    achievementList
};

