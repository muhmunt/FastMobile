const db = require("../models");
const user = require("../core/user");
const {first} = require("../helpers/utils");

async function updateProfile(req, res){
  let param = req.body;
  let userId = req.userId;
  let getUser = await db.user.aggregate(user.getUserById({userId: userId}));

  if(!first(getUser)){
    return res.status(200).send({
      status: "FAILED",
      message: "User not found"
    });
  }

  let objForUpdate = {};
  if (param.first_name) objForUpdate.first_name = param.first_name;
  if (param.last_name) objForUpdate.last_name = param.last_name;
  if (param.address) objForUpdate.address = param.address;
  objForUpdate.updated_at = Date.now()

  let update = await db.user.updateOne({_id: userId}, objForUpdate)

  if(update.ok){
    return res.status(200).send({
      status: "SUCCESS",
      result: {
        user_id: userId,
        first_name: param.first_name,
        last_name: param.last_name,
        address: param.address,
        updated_date: Date.now,
      }
    });
  }else{
    return res.status(200).send({
      status: "FAILED",
      message: "Something Wrong!"
    });
  }

}

module.exports = {
  updateProfile
}