const {uuid} = require('../helpers/utils');

function getUserById(param){
  let get = [
    {
      $match: {
        _id: param.userId
      }
    }
  ]

  return get
}

module.exports = {
  getUserById
}