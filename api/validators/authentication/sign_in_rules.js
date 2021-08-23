const { body } = require("express-validator");
const { UserModel } = require("../../models/user");

const sign_in_rules = () => {
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
              if (!user) return Promise.reject("Username does not exist");
            });
        }
        return true;
      }),
    body("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password can not be empty"),
  ];
};

module.exports = {
  sign_in_rules,
};
