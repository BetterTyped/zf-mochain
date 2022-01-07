import Knex from 'knex';
import { hash } from 'bcrypt';

export async function seed(knex): Promise<void> {

    await knex('user').del();
    const user1pass = await hash('user1pass', 10);
    await knex('user').insert([
        {
            id: 1,
            email: 'user1@gmail.com',
            password: user1pass,
        }
    ]);
}

