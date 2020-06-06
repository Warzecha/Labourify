const mongoose = require('mongoose');
const User = mongoose.model('User');
const {ErrorHandler} = require("../helpers/error");
const bcrypt = require('bcrypt');
const AchievementProgressService = require('./AchievementProgressService');
const {sign} = require('../helpers/auth');

const saltRounds = 10;

exports.register = async (registrationRequest) => {

    const {
        email,
        username,
        password,
        passwordConfirmation
    } = registrationRequest;

    if (!password) {
        throw new ErrorHandler(400, 'Password is required');
    }

    if (!email) {
        throw new ErrorHandler(400, 'Email is required');
    }

    if (!username) {
        throw new ErrorHandler(400, 'Username is required');
    }

    if (password !== passwordConfirmation) {
        throw new ErrorHandler(400, 'Passwords do not match');
    }

    const user = await User.findOne({where: {email}}).exec();
    if (user) {
        throw new ErrorHandler(400, 'User with the specified email already exists');
    }

    bcrypt.hash(password, saltRounds).then((passwordHash) => {

        User.create({
            username,
            email,
            passwordHash,
        });
    });

    return {username, email};
};

exports.login = async (loginRequest) => {

    const {
        email,
        password,
    } = loginRequest;

    if (!password) {
        throw new ErrorHandler(400, 'Password is required');
    }

    if (!email) {
        throw new ErrorHandler(400, 'Email is required');
    }

    const user = await User.findOne({email}).exec();

    if (!user) {
        throw new ErrorHandler(403, 'Wrong login credentials');
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {

        const tokenPayload = {
            sub: user.id
        };

        let token = sign(tokenPayload);
        return {accessToken: token};
    } else {
        throw new ErrorHandler(403, 'Wrong login credentials');
    }

};

exports.getById = async (id) => {
    const user = await User.findById(id).exec();

    if (user == null) {
        throw new ErrorHandler(404, 'User not found');
    }

    return formatUserDetails(user);
};

exports.listAll = async () => {
    return (await User.find().exec())
        .map(formatUserDetails);
};

exports.getAllByGithubUsername = async (username) => {
    const userList = await User.find(
        {
            githubAccount: {username}
        }).exec();

    return userList.map(formatUserDetails);
};

exports.update = async (id, user) => {


    const updated = await User.findByIdAndUpdate(id, user).exec();

    const {
        githubAccount,
        slackAccount,
        image
    } = updated;

    if (githubAccount && githubAccount.username) {
        await AchievementProgressService.updateProgress(id, 'github-integration', {increaseScore: 1});
    }

    if (slackAccount && slackAccount.username) {
        await AchievementProgressService.updateProgress(id, 'slack-integration', {increaseScore: 1});
    }

    const prev = await User.findById(id).exec();

    if (prev.image !== image) {
        await AchievementProgressService.updateProgress(id, 'photogenic', {increaseScore: 1});
    }


    return formatUserDetails(updated);
};


const formatUserDetails = user => {
    const {
        username, email, githubAccount, slackAccount, image
    } = user;

    return {
        id: user._id,
        username,
        email,
        githubAccount,
        slackAccount,
        image
    };
};

