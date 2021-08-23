const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  name: String,
  amount: Number,
  user: mongoose.Types.ObjectId,
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

module.exports = { ExpenseModel };
