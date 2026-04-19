import { cadastrar } from '../models/usuario.model.js';

export async function cadastrarUsuario({ email, nome, senha }) {
  try {
    const dadosEstaoValidos = validarCadastro(email, nome, senha);

    if (!dadosEstaoValidos) {
      return { mensagem: 'Dados inválidos' };
    }
    const resultado = await cadastrar({ nome, email, senha });

    if (!resultado) {
      return { mensagem: 'Erro na model' };
    }

    return resultado;
  } catch (error) {
    return { mensagem: 'Erro na controller' };
  }
}

function validarCadastro(email, nome, senha) {
  if (
    typeof nome !== 'string' ||
    typeof email !== 'string' ||
    typeof senha !== 'string'
  ) {
    return false;
  }

  const nomeFormatado = nome.trim();
  const emailFormatado = email.trim();
  const senhaFormatado = senha.trim();

  if (nomeFormatado.length === 0 || nomeFormatado.length > 100) {
    return false;
  }

  if (
    emailFormatado.length === 0 ||
    emailFormatado.length > 150 ||
    !emailFormatado.includes('@')
  ) {
    return false;
  }

  if (senhaFormatado.length === 0 || senhaFormatado.length > 255) {
    return false;
  }

  return true;
}
