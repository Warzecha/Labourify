const mongoose = require('mongoose');
const User = mongoose.model('User');
const {ErrorHandler} = require("../helpers/error");
const bcrypt = require('bcrypt');
const TokenGenerator = require('../helpers/TokenGenerator');

const saltRounds = 10;


const tokenGenerator = new TokenGenerator();

exports.register = async (registrationRequest) => {

    const {
        email,
        username,
        password,
        passwordConfirmation
    } = registrationRequest;

    if (!password) {
        throw new ErrorHandler(400, 'Password is required')
    }

    if (!email) {
        throw new ErrorHandler(400, 'Email is required')
    }

    if (!username) {
        throw new ErrorHandler(400, 'Username is required')
    }

    if (password !== passwordConfirmation) {
        throw new ErrorHandler(400, 'Passwords do not match')
    }

    const user = await User.findOne({where: {email}}).exec();
    if (user) {
        throw new ErrorHandler(400, 'User with the specified email already exists')
    }

    bcrypt.hash(password, saltRounds).then((passwordHash) => {

        User.create({
            username,
            email,
            passwordHash,
        })
    });

    return {username, email}
};

exports.login = async (loginRequest) => {

    const {
        email,
        password,
    } = loginRequest;

    if (!password) {
        throw new ErrorHandler(400, 'Password is required')
    }

    if (!email) {
        throw new ErrorHandler(400, 'Email is required')
    }

    const user = await User.findOne({email}).exec();

    if (!user) {
        throw new ErrorHandler(403, 'Email and password does not match')
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {

        const tokenPayload = {
            sub: user.id
        };

        let token = tokenGenerator.sign(tokenPayload);
        return {accessToken: token};
    } else {
        throw new ErrorHandler(403, 'Email and password does not match')
    }

};
