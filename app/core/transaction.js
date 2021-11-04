const {uuid} = require('../helpers/utils');

function insertTransaction(param){
  let create = {
    _id: param.id,
    user: param.user,
    amount: param.amount,
    status: param.status,
    transaction_type: param.transaction_type,
    balance_before: param.balance_before,
    balance_after: param.balance_after,
    type: param.type,
    remarks: param.remarks,
    target_user: param.target,
    created_date: Date.now()
  }

  return create
}

function getTransactionById(param){
  let get = [
    {
      $match: {
        _id: param.transactionId
      }
    },
    {
      $project: {
        __v : 0
      }
    }
  ]

  return get
}

module.exports = {
  insertTransaction,
  getTransactionById
}