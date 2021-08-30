const { Router } = require('express');
const ExpenseRouter = Router();
const { isAuthenticated } = require('../middlewares/security/security');
const { ExpenseModel } = require('../models/expense');
const {
  create_expense_rules,
} = require('../validators/expense/create_expense_rules');
const {
  delete_expense_rules,
} = require('../validators/expense/delete_expense_rules');
const {
  update_expense_rules,
} = require('../validators/expense/update_expense_rules');
const { validate } = require('../validators/validate');

ExpenseRouter.post(
  '/expense',
  isAuthenticated,
  create_expense_rules(),
  validate,
  async (req, res) => {
    const name = req.body.name;
    const amount = req.body.amount;
    const expense = new ExpenseModel({
      name,
      amount,
      user: req.claims._id,
    });
    await expense.save();
    res.status(200).json({ expense });
  }
);

ExpenseRouter.get('/expenses', isAuthenticated, async (req, res) => {
  const expenses = await ExpenseModel.find({ user: req.claims._id }).exec();
  res.status(200).json({ expenses });
});

ExpenseRouter.put(
  '/expense',
  isAuthenticated,
  update_expense_rules(),
  validate,
  async (req, res) => {
    let updates = {};
    const name = req.body.name;
    const amount = req.body.amount;
    if (name) {
      updates.name = name;
    }
    if (amount) {
      updates.amount = amount;
    }
    const expense = await ExpenseModel.findOneAndUpdate(
      { _id: req.body._id, user: req.claims._id },
      updates
    ).exec();
    res.status(200).json({ expense });
  }
);

ExpenseRouter.delete(
  '/expense/:_id',
  isAuthenticated,
  delete_expense_rules(),
  validate,
  async (req, res) => {
    const expense = await ExpenseModel.findOneAndDelete({
      _id: req.params._id,
      user: req.claims._id,
    }).exec();
    res.status(200).json({ message: expense });
  }
);

module.exports = { ExpenseRouter };
