import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();

    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}

