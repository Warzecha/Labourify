const mongoose = require('mongoose');
const {HandledHttpError} = require('../helpers/error');
const {NotFoundError} = require('./MongooseUtils');
const {ValidationError, CastError} = mongoose.Error;

const handleMongooseValidationError = (err) => {
    if (err instanceof ValidationError) {
        throw new HandledHttpError(400, err.message);
    } else if (err instanceof CastError) {
        throw new HandledHttpError(400, err.message);
    } else if (err instanceof NotFoundError) {
        throw new HandledHttpError(404, 'Not found');
    } else {
        throw new HandledHttpError(500, err.message);
    }
};

module.exports = {
    handleMongooseValidationError
};
