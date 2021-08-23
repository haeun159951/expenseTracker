const { body } = require("express-validator");
const { ExpenseModel } = require("../../models/expense");

const delete_expense_rules = () => {
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
  ];
};

module.exports = {
  delete_expense_rules,
};
