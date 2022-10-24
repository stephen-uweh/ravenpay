/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id");
    table.string("trx_ref");
    table.float("amount");
    table.string("senderId");
    table.string("senderName");
    table.string("recipientName");
    table.string("recipientAccountNumber");
    table.string("recipientBank");
    table.string("transactionsStatus");
    table.string("narration");
    table.string("type");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('transactions');
};
