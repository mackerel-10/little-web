class CustomError extends Error {
  statusCode;

  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = function (error, request, response, next) {
  const { statusCode, message } = error;

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

export { CustomError, errorHandler };
