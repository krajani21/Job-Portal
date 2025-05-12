const ErrorResponse = require("../utils/errorResponse"); 

//custom error handler middleware
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        //display error message with a 404 status code
        error = new ErrorResponse(message, 404);
    }

    //mongoose duplicate valule
    if (err.code === 11000) {
        const message = "field value entered is duplicate";
        //display error message with a 400 status code, meaning we dont give authorization to enter this value
        error = new ErrorResponse(message, 400);
    }
    //mongoose validation error 
        if (err.name === "validationError") {
        const message = Object.values(err.errors).map(val => " " + val.message);
        //display error message with a 400 status code, meaning we dont give authorization to enter this value
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}

module.exports = errorHandler;