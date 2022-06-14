import knex from 'knex';

const database = knex({
    client: 'mysql',
    connection: process.env.DATABASE_URL
});

export default database;
