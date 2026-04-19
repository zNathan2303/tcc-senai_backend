import * as z from 'zod';
import { cadastrar } from '../models/usuario.model.js';

const cadastroSchema = z.object({
  nome: z.string().trim().min(1).max(100),
  email: z.string().trim().min(6).max(150).toLowerCase().email(),
  senha: z.string().trim().min(8).max(64),
});

export async function cadastrarUsuario(cadastroBody) {
  try {
    const resultadoValidacao = validarCadastro(
      cadastroBody.email,
      cadastroBody.nome,
      cadastroBody.senha,
    );

    if (resultadoValidacao.erro) {
      return { mensagem: 'Dados inválidos' };
    }

    const { email, nome, senha } = resultadoValidacao.dados;

    const resultadoModel = await cadastrar({ email, nome, senha });

    if (!resultadoModel) {
      return { mensagem: 'Erro na model' };
    }

    return resultadoModel;
  } catch (error) {
    return { mensagem: 'Erro na controller' };
  }
}

function validarCadastro(email, nome, senha) {
  const validacao = cadastroSchema.safeParse({ email, nome, senha });

  if (!validacao.success) {
    return { erro: true, detalhes: validacao.error };
  }

  return { erro: false, dados: validacao.data };
}
