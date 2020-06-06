const {ErrorHandler} = require("./error");
const jwt = require('jsonwebtoken');

const {
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env;

const defaultOptions = {
    expiresIn: JWT_EXPIRES_IN
};

const verifyTokenMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!!authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];
        try {
            const decoded = verify(accessToken);
            console.log('Verify', decoded);
            req.auth = {
                token: accessToken,
                data: decoded
            };
            next();
        } catch (e) {
            throw new ErrorHandler(403, 'Invalid token');
        }

    } else {
        throw new ErrorHandler(403, 'Authorization header missing');
    }
};


const sign = (payload, signOptions) => {
    const jwtSignOptions = Object.assign(defaultOptions, signOptions);
    return jwt.sign(payload, JWT_SECRET, jwtSignOptions);
};

const verify = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const getSubjectFromRequest = (req) => {
    const {
        auth: {
            data: {sub}
        }
    } = req;

    return sub;
};

module.exports = {verifyTokenMiddleware, sign, verify, getSubjectFromRequest};
