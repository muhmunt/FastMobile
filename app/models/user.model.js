const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: String,
    first_name: String,
    last_name: String,
    phone_number: String,
    pin: String,
    refresh_token: String,
    address: String,
    created_date: Date
  })
);

module.exports = User;
