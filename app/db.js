// var { getIn, setIn } = require('@thi.ng/paths');
// var { state } = require('./state');
// var { readFile, parseJSON} = require('./file');
// var mongoose = require('mongoose');

// let { capitalize, lower, upper } = require('@thi.ng/strings');

// function db(model, fromDB, refState){
//   let conn
//   let failureConnect = '[DB]: waiting for connection to database to start query';
//   if(!refState ){
//     conn = getConnDefault(state, fromDB);
//   }else{
//     conn = getConnDefault(refState, fromDB);
//   };
//   let modelName = capitalize(model);
  
//   if(conn && conn.models){
//     let connModel = getIn(conn, ['models', modelName])
//     if(connModel){
//       return connModel;
//     }else{
//       return console.log(failureConnect);
//     }
//   }else{
//     return console.log(failureConnect);
//   }
// }
// //TODO: Lookup to state;
// function query(spec){
//   let useDb;
//   let collection = spec.coll;
//   let where = spec.where;
//   if(!collection && !where){
//     let message = "Fatal Error something wrong with collection [coll] or [where]";
//     console.log(message);
//     return { error : true, message };
//   };  
//   if(spec.db){
//     return db(collection, upper('DB_'+spec.db)).aggregate(where);  
//   }else{
//     return db(collection).aggregate(where)
//   }
  
// }

// function batchWrite(spec){
//   let useDb;
//   let collection = spec.coll;
//   let operation = spec.operation;
//   let upsert = spec.upsert || false;
  
//   if(!collection && !operation){
//     let message = 'Fatal Error something wrong with write [operation]';
//     console.log(message);
//     return { error: true, message};
//   }

//   let mappedSpec = spec.operation.map((op, i)=>{
//     let [[key, value]] = Object.entries(op);
//     if(key === 'create'){
//       return {
// 	insertOne: {
// 	  document: value }
//       };
//     }else if(key === 'createMany'){
//       return {
// 	insertMany: {
// 	  document: value }
//       };
//     }else if(key === 'update'){
//       return {
// 	updateOne:{
// 	  filter: value.$match,
// 	  update: value.$set,
// 	  upsert: upsert
// 	}
//       };
//     }else if(key === 'updateMany'){
//       return {
// 	updateMany:{
// 	  filter: value.$match,
// 	  update: value.$set
// 	}
//       }
//     }else if(key === 'delete'){
//       return {
// 	deleteOne: {
// 	  filter: value.$match
// 	}
//       }
//     }else if(key === 'deleteMany'){
//       return {
// 	deleteMany:{
// 	  filter: value.$match
// 	}
//       }
//     }else{
//       console.log(colors.yellow(`WARN`)+' [bulkWrite/warn]: bulk Operations is not supported for key', key);
//       return op;
//     }
    
//   });

//   if(spec.db){
//     return db(collection, upper('DB_'+spec.db)).bulkWrite(mappedSpec).catch(err=>{
//       console.log('error', 'bulkWrite operation: ', err);
//       return Promise.reject({ error: true, message: 'fatal error writing operation'});
//     });
//   }else{
//     return db(collection).bulkWrite(mappedSpec).catch(err=>{
//       console.log('error', 'bulkWrite operation: ', err);
//       return Promise.reject({ error: true, message: 'fatal error writing operation'});
//     });;
//   };
// }

// module.exports = {
//   query, 
//   batchWrite
// };