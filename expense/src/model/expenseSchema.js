const mongoose = require('mongoose');
const ExpenseSchema = mongoose.Schema({
  expenseName: String,
  expenseAmount: Number,
  owner: mongoose.Types.ObjectId,
});

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports = { ExpenseModel };
