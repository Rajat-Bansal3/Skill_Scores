const errorHandler = (status, message) => {
  const error = new Error();
  error.message = message;
  error.statusCode = status;
  return error;
};
const responseHandler = (res, statusCode, data = null, message = null) => {
  return res.status(statusCode).json({ message, data });
};

module.exports = { errorHandler, responseHandler };
