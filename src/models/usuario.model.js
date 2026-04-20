import knex from '../config/database.js';

export async function cadastrar({ email, nome, senha }) {
  const [id] = await knex('usuario').insert({ email, nome, senha });

  return id;
}

export async function obterPorEmail(email) {
  const [usuario] = await knex('usuario')
    .where({ email })
    .select('id', 'nome', 'email', 'senha');

  return usuario;
}
