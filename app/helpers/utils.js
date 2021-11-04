const short   = require('short-uuid');
const translatorID = short();
const shortid  = translatorID.generate;
const uuid     = translatorID.uuid;
const toUUID   = translatorID.toUUID;
const fromUUID = translatorID.fromUUID;

function first(array){
  return array[0] || []
}

module.exports = {
  shortid,
  toUUID,
  uuid,
  first
}