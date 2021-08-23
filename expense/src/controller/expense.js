const { Router } = require('express');
const ExpenseRouter = Router();
const { ExpenseModel } = require('../model/expenseSchema');
const { isAuthenticated } = require('../middleware/security/security');
require('dotenv').config();

ExpenseRouter.post('/expense', isAuthenticated, async (req, res) => {
  const expenseName = req.body.expenseName;
  const expenseAmount = req.body.expenseAmount;
  if (expenseName === undefined || expenseName === '') {
    res.status(400).json({ message: 'expenseName is required' });
  } else if (expenseAmount === undefined || expenseAmount <= 0) {
    res
      .status(400)
      .json({ message: 'expense amount must be greater than zero' });
  } else {
    const expense = new ExpenseModel({
      expenseName,
      expenseAmount,
      user: req.claims._id,
    });
    await expense.save();
    res.status(200).json({ expense });
  }
});

ExpenseRouter.get('/expenses', isAuthenticated, async (req, res) => {
  const expenses = await ExpenseModel.find({
    user: req.claims._id,
  }).exec();

  res.status(200).json({ expenses });
});

ExpenseRouter.put('/expense', isAuthenticated, async (req, res) => {
  const expenseName = req.body.expenseName;
  const expenseAmount = req.body.expenseAmount;

  if (req.body._id === undefined || req.body._id === '') {
    res.json(400).json({ message: 'Expense Id is required' });
  }

  let update = {};

  if (expenseName) {
    update.expenseName = expenseName;
  }

  if (expenseAmount) {
    if (expenseAmount <= 0) {
      res.status(400).json({ message: 'Invalid expense amount' });
    } else {
      update.expenseAmount = expenseAmount;
    }
  }

  const expense = await ExpenseModel.findOneAndUpdate(
    {
      _id: req.body._id,
      user: req.claims._id,
    },
    update
  ).exec();

  if (expense === null) {
    res.status(400).json({ message: 'Invalid expense ID' });
  } else {
    res.status(200).json({ expense });
  }
});

ExpenseRouter.delete('/expense', isAuthenticated, async (req, res) => {
  if (req.body._id === undefined || req.body._id === '') {
    res.status(400).json({ message: 'expense id is requried' });
  } else {
    const expense = await ExpenseModel.findOneAndDelete({
      _id: req.body._id,
      user: req.claims._id,
    }).exec();
    if (expense === null) {
      res.status(400).json({ message: 'Invalid expense id' });
    } else {
      res.status(200).json({ message: expense });
    }
  }
});
module.exports = { ExpenseRouter };
