import knex from '../config/database.js';
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

    throw error;
  }
}

export async function obterPorEmail(email) {
  const [usuario] = await knex('usuario')
    .where({ email })
    .select('id', 'nome', 'email', 'senha');

  return usuario;
}

export async function atualizarNome(id, nome) {
  await knex('usuario').where({ id }).update({ nome });
}

export async function desativar(id) {
  await knex('usuario').where({ id, status: true }).update({ status: false });
}

export async function obter5QueEmailContemValor(valor) {
  const usuarios = await knex('usuario')
    .where({ status: true })
    .andWhereILike('email', `%${valor}%`)
    .select('id', 'nome', 'email', 'foto_perfil')
    .limit(5);

  return usuarios;
}
