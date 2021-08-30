const { body } = require('express-validator');

const create_expense_rules = () => {
  return [
    body('name').exists().isAlpha(),
    body('amount')
      .exists()
      .withMessage('The expense amount is required')
      .isNumeric()
      .withMessage('The expense amount must be a number'),
    // .custom((value, { req }) => {
    //   return value > 0;
    // })
    // .withMessage("The expense amount must be greater than zero"),
  ];
};

module.exports = {
  create_expense_rules,
};
