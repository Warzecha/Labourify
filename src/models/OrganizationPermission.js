const mongoose = require('mongoose');
const {throwErrorIfDoesNotExist} = require('../utils/MongooseUtils');

const {Schema} = mongoose;

const OrganizationPermission = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    organization: {type: Schema.ObjectId, ref: 'Organization'},
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
});

mongoose.model('OrganizationPermission', OrganizationPermission);

OrganizationPermission.post('findOne', throwErrorIfDoesNotExist);
OrganizationPermission.post('findOneAndDelete', throwErrorIfDoesNotExist);

OrganizationPermission.plugin(schema => {
    schema.set('toJSON', {
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;
        },
    });
});

