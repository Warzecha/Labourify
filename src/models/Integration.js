const mongoose = require('mongoose');

const {Schema} = mongoose;

const schema = new Schema({
    platform: {
        type: String
    },
    enabled: {
        type: Boolean
    },
    lastModified: {
        type: String
    },
    defaultIntegration: {
        type: Boolean
    },
});

mongoose.model('Integration', schema);
