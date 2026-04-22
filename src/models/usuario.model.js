import knex from '../config/database.js';

export async function cadastrar(email, nome, senha) {
  try {
    const [id] = await knex('usuario').insert({ email, nome, senha });

    return id;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        erro: true,
        codigo: 400,
        status: 'Bad Request',
        mensagem: 'Não é possível utilizar o e-mail informado para cadastro',
      };
    }
  }
}

export async function obterPorEmail(email) {
  const [usuario] = await knex('usuario')
    .where({ email })
    .select('id', 'nome', 'email', 'senha');

  return usuario;
}
