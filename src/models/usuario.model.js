import knex from '../config/database.js';

export async function cadastrar(usuario) {
  try {
    const { email, nome, senha } = usuario;

    const resultado = await knex.insert({ email, nome, senha }).into('usuario');

    if (resultado) {
      return resultado; // retorna um array com o id solto
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    // console.log(error.code); // Se for ER_DUP_ENTRY, é campo unico que bateu com o mesmo valor
    return false;
  }
}
