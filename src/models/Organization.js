const mongoose = require('mongoose');
const {throwErrorIfDoesNotExist} = require('../utils/MongooseUtils');
const {jsonFormatterPlugin} = require('../utils/MongooseUtils');

const {Schema} = mongoose;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: String
});

mongoose.model('Organization', OrganizationSchema);

OrganizationSchema.post('findOne', throwErrorIfDoesNotExist);
OrganizationSchema.post('findOneAndDelete', throwErrorIfDoesNotExist);

OrganizationSchema.plugin(jsonFormatterPlugin);
