const { body } = require("express-validator");
const { UserModel } = require("../../models/user");

const sign_up_rules = () => {
  return [
    body("username")
      .exists()
      .withMessage("Username is required")
      .notEmpty()
      .withMessage("Username can not be empty")
      .custom((value, { req }) => {
        if (value) {
          return UserModel.findOne({ username: req.body.username })
            .exec()
            .then((user) => {
              if (user) {
                return Promise.reject("Username has been taken");
              }
            });
        }
        return true;
      }),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password is not strong enough"),
    body("email")
      .exists()
      .withMessage("Email address is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email address")
      .custom((value, { req }) => {
        if (value) {
          return UserModel.findOne({ email: req.body.email })
            .exec()
            .then((user) => {
              if (user) {
                return Promise.reject("Email addreess has been taken");
              }
            });
        }
        return true;
      }),
  ];
};

module.exports = {
  sign_up_rules,
};
