const mongoose = require('mongoose');
const {jsonFormatterPlugin} = require('../utils/MongooseUtils');
const {throwErrorIfDoesNotExist} = require('../utils/MongooseUtils');
let OrganizationPermission = mongoose.model('OrganizationPermission');


const {Schema} = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    passwordHash: String,
    image: String,
    githubAccount: {
        username: String
    },
    slackAccount: {
        username: String
    },
    orgPermissions: [
        {
            type: Schema.ObjectId,
            ref: 'OrganizationPermission',
            default: []
        }
    ]
});

mongoose.model('User', UserSchema);


UserSchema.post('findOne', throwErrorIfDoesNotExist);
UserSchema.post('findOneAndDelete', throwErrorIfDoesNotExist);

UserSchema.plugin(jsonFormatterPlugin);
