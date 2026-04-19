import knex from '../config/database.js';

export async function cadastrar({ email, nome, senha }) {
  try {
    const resultado = await knex.insert({ email, nome, senha }).into('usuario');

    if (resultado) {
      return resultado;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.code); // Se for ER_DUP_ENTRY, é campo unico que bateu com o mesmo valor
    return false;
  }
}
