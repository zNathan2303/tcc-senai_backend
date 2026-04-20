import knex from '../config/database.js';

export async function cadastrar({ email, nome, senha }) {
  const [id] = await knex('usuario').insert({ email, nome, senha });

  return id;
}
