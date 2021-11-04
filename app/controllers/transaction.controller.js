const db = require("../models");
const user = require("../core/user");
const transaction = require("../core/transaction");
const wallet = require("../core/wallet");
const {first, uuid} = require("../helpers/utils");

async function topupWallet(req, res){
  let param = req.body;
  let userId = req.userId;

  let getUser = await db.user.aggregate(user.getUserById({userId: userId}));
  
  if(!first(getUser)){
    return res.status(200).send({
      status: "FAILED",
      message: "User not found"
    });
  }

  let getWallet = await db.wallet.aggregate(wallet.getWalletById({userId: userId}));
  let dataWallet = first(getWallet);
  let topupId = uuid();
  let topup = await db.transaction.create(transaction.insertTransaction({
    id: topupId, 
    user: userId, 
    amount: param.amount, 
    target: userId, 
    type: "topup", 
    remarks: "Topup "+ param.amount,
    status: "success",
    transaction_type: "credit",
    balance_before: dataWallet.balance,
    balance_after: dataWallet.balance + param.amount,
  }))
 
  if(topup){
    let updateWallet = await db.wallet.updateOne({user: userId}, {balance: dataWallet.balance + param.amount, "$push": { transaction: topupId }})

    return res.status(200).send({
      status: "SUCCESS",
      result: {
        top_up_id: topupId,
        amount_top_up: param.amount,
        balance_before: dataWallet.balance,
        balance_after: dataWallet.balance + param.amount,
        address: param.address,
        created_date: Date.now,
      }
    });
  }else{
    return res.status(200).send({
      status: "FAILED",
      message: "Something Wrong!"
    });
  }

}

async function pay(req, res){
  let param = req.body;
  let userId = req.userId;

  let getUser = await db.user.aggregate(user.getUserById({userId: userId}));
  
  if(!first(getUser)){
    return res.status(200).send({
      status: "FAILED",
      message: "User not found"
    });
  }

  let getWallet = await db.wallet.aggregate(wallet.getWalletById({userId: userId}));
  let dataWallet = first(getWallet);
  let payId = uuid();
  let pay = await db.transaction.create(transaction.insertTransaction({
    id: payId, 
    user: userId,
    amount: param.amount, 
    target: userId, 
    type: "payment", 
    remarks: param.remarks,
    status: "success",
    transaction_type: "debit",
    balance_before: dataWallet.balance,
    balance_after: dataWallet.balance - param.amount,
  }))
 
  if(pay){
    let updateWallet = await db.wallet.updateOne({user: userId}, {balance: dataWallet.balance - param.amount, "$push": { transaction: payId }})

    return res.status(200).send({
      status: "SUCCESS",
      result: {
        payment_id: payId,
        amount: param.amount,
        remarks: param.remarks,
        balance_before: dataWallet.balance,
        balance_after: dataWallet.balance - param.amount,
        created_date: Date.now,
      }
    });
  }else{
    return res.status(200).send({
      status: "FAILED",
      message: "Something Wrong!"
    });
  }

}

async function transfer(req, res){
  let param = req.body;
  let userId = req.userId;

  let getUser = await db.user.aggregate(user.getUserById({userId: userId}));
  
  if(!first(getUser)){
    return res.status(200).send({
      status: "FAILED",
      message: "User not found"
    });
  }

  let getWallet = await db.wallet.aggregate(wallet.getWalletById({userId: userId}));
  let dataWallet = first(getWallet);
  let transferId = uuid();
  let transfer = await db.transaction.create(transaction.insertTransaction({
    id: transferId, 
    user: userId,
    amount: param.amount, 
    target: param.target_user, 
    type: "transfer", 
    remarks: param.remarks,
    status: "success",
    transaction_type: "debit",
    balance_before: dataWallet.balance,
    balance_after: dataWallet.balance - param.amount,
  }))
 
  if(transfer){
    let updateWallet = await db.wallet.updateOne({user: userId}, {balance: dataWallet.balance - param.amount, "$push": { transaction: transferId }})

    let getWalletTarget = await db.wallet.aggregate(wallet.getWalletById({userId: param.target_user}));
    let dataWalletTarger = first(getWalletTarget);

    let updateWalletTarget = await db.wallet.updateOne({user: param.target_user}, {balance: dataWalletTarger.balance + param.amount, "$push": { transaction: transferId }})

    return res.status(200).send({
      status: "SUCCESS",
      result: {
        transfer_id: transferId,
        amount: param.amount,
        remarks: param.remarks,
        balance_before: dataWallet.balance,
        balance_after: dataWallet.balance - param.amount,
        created_date: Date.now,
      }
    });
  }else{
    return res.status(200).send({
      status: "FAILED",
      message: "Something Wrong!"
    });
  }

}

async function transactionsHistory(req, res){
  let param = req.body;
  let userId = req.userId;

  let getUser = await db.user.aggregate(user.getUserById({userId: userId}));
  
  if(!first(getUser)){
    return res.status(200).send({
      status: "FAILED",
      message: "User not found"
    });
  }

  let getWallet = await db.wallet.aggregate(wallet.getWalletById({userId: userId}));
  let dataWallet = first(getWallet);
  console.log(dataWallet)
  
  let dataTransaction = await dataWallet.transaction.reduce(async function(acc, data) {
    
    let getTransaction = await db.transaction.aggregate(transaction.getTransactionById({transactionId: data}));

    var ac = await acc;
    var result = ac.concat(getTransaction[0]);
    return result

  }, []);

  return res.status(200).send({
    status: "SUCCESS",
    result: dataTransaction
  });

}

module.exports = {
  topupWallet,
  pay,
  transfer,
  transactionsHistory
}