const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const exceptions = {};

  errors.array().map((error) => (exceptions[error.param] = error.msg));

  return res.status(400).json({
    validation_errors: exceptions,
  });
};

module.exports = { validate };
