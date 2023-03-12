/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const all = knex.schema.createTable('challanges', (table) => {
        table.increments('challangeId');
        table.string('challangeName').notNullable();
        table.string('challangeDetails');
    })
    .createTable('tasks', (table) => {
        table.increments('taskId');
        table.string('taskName').notNullable();
        table.string('taskDetails');
        table.dateTime('taskDate');
        table.integer('challangeId')
                    .references('challangeId')
                    .inTable('challanges')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');              
    });

    return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
            .dropTableIfExists("challanges")
            .dropTableIfExists('tasks');
};
