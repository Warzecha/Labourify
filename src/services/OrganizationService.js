const mongoose = require('mongoose');
const {HandledHttpError} = require('../helpers/error');
const {handleMongooseValidationError} = require('../utils/errorUtils');
const Organization = mongoose.model('Organization');
const User = mongoose.model('User');
const OrganizationPermission = mongoose.model('OrganizationPermission');

const createOrganization = async (createOrganizationRequest, creatorId) => {
    if (!creatorId) {
        console.error('CreatorId missing');
        throw new HandledHttpError(500, 'Parameter creatorId missing.');
    }

    const creatorObjectId = mongoose.Types.ObjectId(creatorId);

    try {
        const {name} = createOrganizationRequest;
        const urlSlug = name
            .replace(/[^0-9a-zA-Z-]+/, '')
            .replace(/\s+/, '-');

        const organization = new Organization({
            ...createOrganizationRequest,
            urlSlug: urlSlug,
            users: [creatorObjectId]
        });

        const createdOrganization = await organization.save();


        const orgPermission = new OrganizationPermission({
            organization: createdOrganization.id,
            user: creatorObjectId,
            role: 'ADMIN'
        });

        const createdPermission = await orgPermission.save();

        let user = await User.findByIdAndUpdate(creatorId, {
            $push: {
                orgPermissions: createdPermission._id
            }
        });

        return organization;

    } catch (e) {
        return handleMongooseValidationError(e);
    }
};

const listAll = async (query) => {
    try {
        return await Organization.find(query).exec();
    } catch (e) {
        handleMongooseValidationError(e);
    }
};

const getById = async (id) => {
    try {
        return await Organization.findById(id)
            // .populate({path: 'users'})
            .exec();
    } catch (e) {
        handleMongooseValidationError(e);
    }
};

const getByUrlSlug = async (orgSlug) => {
    try {
        const org = await Organization.findOne({urlSlug: orgSlug})
            // .populate({path: 'users'})
            .exec();

        const memberCount = await OrganizationPermission.find({organization: org._id}).count();

        return {
            ...org.toJSON(),
            memberCount
        };
    } catch (e) {
        handleMongooseValidationError(e);
    }
};


module.exports = {
    createOrganization,
    getById,
    listAll,
    getByUrlSlug,
};

