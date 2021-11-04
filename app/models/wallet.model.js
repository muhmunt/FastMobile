const mongoose = require("mongoose");

const Wallet = mongoose.model(
  "Wallet",
  new mongoose.Schema({
    _id: String,
    user: {type: "String", ref: "User"},
    balance: Number,
    transaction: [{type: "String"}],
    created_date: Date,
    updated_date: Date
  })
);

module.exports = Wallet;