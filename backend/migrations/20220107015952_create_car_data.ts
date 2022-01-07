import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('car_data', table => {
    table.increments('id').primary();

    table.string('sender_address').notNullable();
    table.string('car_brand').nullable();
    table.string('car_type').nullable();
    table.jsonb('weather').nullable();
    table.integer('speed').nullable();
    table.jsonb('position').nullable();
    table.timestamp('timestamp').nullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('car_data');
}

