const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    _id: String,
    user: String,
    target_user: String,
    status: String,
    transaction_type: String,
    type: String,
    amount: Number,
    balance_before: Number,
    balance_after: Number,
    remarks: String,
    created_date: Date,
    updated_date: Date
  })
);

module.exports = Transaction;
