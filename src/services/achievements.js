const achievementList = [
    {
        id: 'beginner-commit-10',
        name: 'Beginner commit',
        description: 'Submit a commit 10 times',
        targetScore: 10,
        image: '/static/images/badges/beginner-commit.png',
        experiencePoints: 1
    },
    {
        id: 'intermediate-commit-100',
        name: 'Intermediate commit',
        description: 'Submit a commit 100 times',
        targetScore: 100,
        image: '/static/images/badges/intermediate-commit.png',
        experiencePoints: 10
    },
    {
        id: 'advanced-commit-1000',
        name: 'Advanced commit',
        description: 'Submit a commit 1000 times',
        targetScore: 1000,
        image: '/static/images/badges/advanced-commit.png',
        experiencePoints: 100
    },
    {
        id: 'photogenic',
        name: 'Photogenic',
        description: 'Upload profile photo',
        targetScore: 1,
        image: '/static/images/badges/photogenic.png',
        experiencePoints: 10
    },
    {
        id: 'github-integration',
        name: 'GitHub',
        description: 'Add your GitHub username od something else or even nothing',
        targetScore: 1,
        image: '/static/images/badges/github-integration.png',
        experiencePoints: 1
    },
    {
        id: 'slack-integration',
        name: 'Slack',
        description: 'Add your Slack username',
        targetScore: 1,
        image: '/static/images/badges/slack-integration.png',
        experiencePoints: 1
    },
    {
        id: 'burning-the-midnight-oil',
        name: 'Burning the midnight oil',
        description: 'Submit a commit between midnight and 5am.',
        targetScore: 1,
        image: '/static/images/badges/burning-the-midnight-oil.png',
        experiencePoints: 1
    }
];

module.exports = {
    achievementList
};

