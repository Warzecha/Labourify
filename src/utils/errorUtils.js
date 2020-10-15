const mongoose = require('mongoose');
const {HandledHttpError} = require('../helpers/error');
const {NotFoundError} = require('./MongooseUtils');
const ValidationError = mongoose.Error.ValidationError;
const CastError = mongoose.Error.CastError;

const handleMongooseValidationError = (err) => {
    if (err instanceof ValidationError || err instanceof CastError) {
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
