const { knex } = require("knex");

const addTransaction = (data) => {
  knex.transaction(async function (trx) {
    return await trx("transactions").insert(data);
  });
};

const retrieveDeposits = (userId) => {
  knex.transaction(async function (trx) {
    return await trx("transactions").where({ userId: userId, type: "Credit" });
  });
};

const retrieveTransfers = (userId) => {
  knex.transaction(async function (trx) {
    return await trx("transactions").where({ userId: userId, type: "Debit" });
  });
};

const transactionsHistory = (userId) => {
    knex.transaction(async function (trx) {
        return await trx("transactions").where({ userId: userId});
      });
}

module.exports = {
  addTransaction,
  retrieveDeposits,
  retrieveTransfers,
  transactionsHistory
};
