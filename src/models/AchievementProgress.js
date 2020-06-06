const mongoose = require('mongoose');

const {Schema} = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    targetScore: {
        type: Number,
        required: true
    },
    obtainedAt: {
        type: String,
    },
    achievementId: {
        type: String,
        required: true
    },
});

mongoose.model('AchievementProgress', schema);
