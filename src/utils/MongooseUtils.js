const MONGO_UNIQUE_ERROR = 11000;

class NotFoundError extends Error {
}

const jsonFormatterPlugin = (schema) => {
    schema.set('toJSON', {
        transform: (doc, ret) => {
            delete ret.__v;
            ret.id = ret._id.toString();
            delete ret._id;
        },
    });
};

const throwErrorIfDoesNotExist = (res, next) => {
    if (!res) {
        return next(new NotFoundError());
    }
    return next();
};


module.exports = {
    MONGO_UNIQUE_ERROR,
    NotFoundError,
    jsonFormatterPlugin,
    throwErrorIfDoesNotExist
};
