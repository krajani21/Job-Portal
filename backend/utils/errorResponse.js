class errorResponse extends Error {
  constructor(message, statusCode) {
    super(message);//pass the message to the parent class
    this.statusCode = statusCode;
    //exclude the constructor from the stack trace
    //show only where the error occurred, making it useful for debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = errorResponse;
//this class extends the built-in Error class to create a custom error response.