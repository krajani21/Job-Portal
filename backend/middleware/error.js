const ErrorResponse = require('../utils/errorResponse'); 

//custom error handler middleware
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        //display error message with a 404 status code
        error = new ErrorResponse(message, 404);
    } 
}

module.exports = errorHandler;