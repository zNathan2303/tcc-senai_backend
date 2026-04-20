import * as z from 'zod';
import { cadastrar, obterPorEmail } from '../models/usuario.model.js';
import { ERRO_INTERNO_DO_SERVIDOR } from '../messages/erros.js';
import { formatarErrosZod } from '../utils/formatacoes.js';

const campoEmail = z
  .string('Deve ser uma String')
  .trim()
  .min(6, 'Mínimo 6 caracteres')
  .max(150, 'Máximo 150 caracteres')
  .toLowerCase()
  .email('Deve ser um e-mail válido');

const campoSenha = z
  .string('Deve ser uma String')
  .trim()
  .min(8, 'Mínimo 8 caracteres')
  .max(64, 'Máximo 64 caracteres');

const cadastroSchema = z.object({
  nome: z
    .string('Deve ser uma String')
    .trim()
    .min(1, 'Mínimo 1 caractere')
    .max(100, 'Máximo 100 caracteres'),
  email: campoEmail,
  senha: campoSenha,
});

const loginSchema = z.object({
  email: campoEmail,
  senha: campoSenha,
});

export async function cadastrarUsuario(cadastroBody) {
  try {
    const { email, nome, senha } = cadastroSchema.parse(cadastroBody);

    const id = await cadastrar({ email, nome, senha });

    return {
      id,
      nome,
      email,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        erro: true,
        codigo: 422,
        status: 'Unprocessable Entity',
        erros: formatarErrosZod(error.issues),
      };
    }

    // Erro do banco de dados - E-mail já existente em um dos registros da tabela usuario
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        erro: true,
        codigo: 400,
        status: 'Bad Request',
        mensagem: 'Não é possível utilizar o e-mail informado para cadastro',
      };
    }

    return ERRO_INTERNO_DO_SERVIDOR;
  }
}

export async function logarUsuario(loginBody) {
  try {
    const { email, senha } = loginSchema.parse(loginBody);

    const usuario = await obterPorEmail(email);

    if (!usuario || senha !== usuario.senha) {
      return {
        erro: true,
        codigo: 401,
        status: 'Unauthorized',
        mensagem: 'E-mail ou senha incorretos',
      };
    }

    const token = usuario.senha;

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        erro: true,
        codigo: 422,
        status: 'Unprocessable Entity',
        erros: formatarErrosZod(error.issues),
      };
    }

    return ERRO_INTERNO_DO_SERVIDOR;
  }
}
