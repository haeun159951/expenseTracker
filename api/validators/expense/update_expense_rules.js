const { body } = require("express-validator");
const { ExpenseModel } = require("../../models/expense");

const update_expense_rules = () => {
  return [
    body("_id")
      .exists()
      .withMessage("The expense ID is required")
      .custom((value, { req }) => {
        if (value) {
          return ExpenseModel.findOne({
            _id: req.body._id,
            user: req.claims._id,
          })
            .exec()
            .then((expense) => {
              if (!expense)
                return Promise.reject(
                  "The expense record does not exist or you do not have permission"
                );
            });
        }
        return true;
      }),
    body("name")
      .custom((value, { req }) => {
        if (value) {
          return validator.default.isAlpha(value);
        }
        return true;
      })
      .withMessage("The expense name must be a string"),
    body("amount")
      .custom((value, { req }) => {
        if (value) {
          return /^[\d-+]+$/.test(value);
        }
        return true;
      })
      .withMessage("The expense amount must be a number")
      .custom((value, { req }) => {
        if (value) {
          return value > 0;
        }
        return true;
      })
      .withMessage("The expense amount must be greater than zero"),
  ];
};

module.exports = {
  update_expense_rules,
};
