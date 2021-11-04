const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicatePhone = (req, res, next) => {
  // Phone
  User.findOne({
    phone_number: req.body.phone_number
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(200).send({ message: "Failed! Phone number is already in use!" });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicatePhone
};

module.exports = verifySignUp;