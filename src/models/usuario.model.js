import knex from '../config/database.js';
import ApiError from '../errors/ApiError.js';
import ConflictError from '../errors/ConflictError.js';

export async function cadastrar(email, nome, senha) {
  try {
    const [id] = await knex('usuario').insert({ email, nome, senha });

    return id;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictError(
        'Não é possível utilizar o e-mail informado para cadastro',
      );
    }

    throw new ApiError();
  }
}

export async function obterPorEmail(email) {
  const [usuario] = await knex('usuario')
    .where({ email })
    .select('id', 'nome', 'email', 'senha');

  return usuario;
}
