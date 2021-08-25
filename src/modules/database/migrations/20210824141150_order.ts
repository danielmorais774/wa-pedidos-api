import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table.text('description').notNullable();
    table.integer('qtd').nullable();
    table.decimal('price', 14, 2).notNullable();
    table
      .bigInteger('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('User');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Order');
}
