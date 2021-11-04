const dotenv = require('dotenv');
const {uuid} = require('../helpers/utils');
const crypto = require("crypto");
const db = require("../models");
const User = db.user;
const Wallet = db.wallet;
dotenv.config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  var refresh_token = crypto.randomBytes(40).toString('hex');
  var userId = uuid();

  const user = new User({
    _id: userId,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    pin: bcrypt.hashSync(req.body.pin, 8),
    refresh_token: refresh_token,
    created_date: Date.now()
  });

  const wallet = new Wallet({
    _id: uuid(),
    user: userId,
    balance: 0,
    created_date: Date.now()
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    wallet.save(wallet);

    res.send({
      status: "SUCCESS", 
      result: {
        user_id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        created_date: user.created_date,
      }});
  });
};

exports.signin = (req, res) => {
  User.findOne({
    phone_number: req.body.phone_number
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.pin,
        user.pin
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
      });
      var refresh_token = crypto.randomBytes(40).toString('hex');

      res.status(200).send({
        status: "SUCCESS",
        result: {
          access_token: token,
          refresh_token: user.refresh_token
        }
      });
    });
};
