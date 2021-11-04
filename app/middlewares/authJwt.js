const jwt = require("jsonwebtoken");
const db = require("../models");
var { getIn, setIn } = require('@thi.ng/paths');
const User = db.user;
const Role = db.role;
const dotenv = require('dotenv');
dotenv.config();

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
 
  if (!token && !token.startsWith("Bearer")) {
    return res.status(403).send({ message: "No token provided!" });
  }

  let jwtToken = token.slice(7);

  jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;
