exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.boolean('validated').notNullable().defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
