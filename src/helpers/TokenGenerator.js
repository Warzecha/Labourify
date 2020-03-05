const jwt = require('jsonwebtoken');

function TokenGenerator(options) {
    this.secret = process.env.JWT_SECRET;
    // this.secretOrPublicKey = secretOrPublicKey;

    const defaultOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN
    };

    this.options = Object.assign(defaultOptions, options); //algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function (payload, signOptions) {
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.secret, jwtSignOptions);
};

TokenGenerator.prototype.verify = function (token) {
    return jwt.verify(token, this.secret);
};
module.exports = TokenGenerator;
