const {uuid} = require('../helpers/utils');

function getWalletById(param){
  let get = [
    {
      $match: {
        user: param.userId
      }
    }
  ]

  return get
}

function getWalletTransactionHistoryByUser(param){
  let get = [
    {
      $match: {
        user: param.userId
      },
      
    }
  ]

  return get
}

module.exports = {
  getWalletById
}