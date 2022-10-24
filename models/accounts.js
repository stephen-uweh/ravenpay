const { default: knex } = require("knex");
const db = require("../config/dbConfig.js");
const crypto = require('crypto');
const { v4: uuid4 } = require("uuid");
const jwt = require("jsonwebtoken");
// GET ALL ACCOUNTS
// const find = () => {
//   return db("accounts");
// };

// GET SPECIFIC ACCOUNT BY ACCOUNT NUMBER
const findByAccountNumber = (accountNumber) => {
  knex.transaction(async function (trx) {
    return await trx("accounts").where("accountNumber", accountNumber);
  });
};

// ADD AN ACCOUNT
const addAccount = async (account) => {
  let newAccount = await knex("accounts").insert(account);
  return newAccount;
};

const findByParam = (param) => {
  knex.transaction(async function (trx) {
    return await trx("accounts").where(param);
  });
};


const updateBalance = (userId, amount) => {
  knex.transaction(async function(trx){
    return await trx('accounts').where({userId: userId}).update({ balance: amount });
  });
};

const setPin = (userId, pin) => {
  knex.transaction(async function (trx) {
    let salt = uuid4();
    let hashed = crypto.createHmac("sha1", salt).update(pin).digest("hex");
    await trx("accounts").where("userId", userId).update({ PIN: hashed });
    return findByParam({userId: userId});
  });
};




module.exports = {
    findByAccountNumber,
    addAccount,
    findByParam,
    updateBalance,
    setPin
}