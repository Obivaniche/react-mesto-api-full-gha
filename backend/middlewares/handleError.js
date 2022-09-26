const { SERVER_ERROR_STATUS } = require('../utils/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_STATUS, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_STATUS
        ? 'Ошибка сервера'
        : message,
    });
  next();
};
