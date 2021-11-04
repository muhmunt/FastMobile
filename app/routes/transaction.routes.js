const { authJwt } = require("../middlewares");
const controller = require("../controllers/transaction.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/topup", [authJwt.verifyToken], controller.topupWallet);
  app.post("/api/pay", [authJwt.verifyToken], controller.pay);
  app.post("/api/transfer", [authJwt.verifyToken], controller.transfer);
  app.get("/api/transactions", [authJwt.verifyToken], controller.transactionsHistory);

};
