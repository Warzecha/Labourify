const mongoose = require('mongoose');
const {throwErrorIfDoesNotExist} = require('../utils/MongooseUtils');
const {jsonFormatterPlugin} = require('../utils/MongooseUtils');

const {Schema} = mongoose;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    urlSlug: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]$/
    },
    icon: String
});

mongoose.model('Organization', OrganizationSchema);

OrganizationSchema.post('findOne', throwErrorIfDoesNotExist);
OrganizationSchema.post('findOneAndDelete', throwErrorIfDoesNotExist);

OrganizationSchema.plugin(jsonFormatterPlugin);
