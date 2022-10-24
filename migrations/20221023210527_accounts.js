/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.increments('id');
    table.string('accountNumber');
    table.string('bank')
    table.double('balance');
    table.string('fullname');
    table.integer('PIN');
    table.string('userId');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
