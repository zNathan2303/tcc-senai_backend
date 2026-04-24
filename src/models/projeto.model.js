import knex from '../config/database.js';

export async function criar({ titulo, descricao, criador_id }) {
  const [id] = knex('projeto').insert({ titulo, descricao, criador_id });

  return id;
}
