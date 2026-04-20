import * as z from 'zod';
import { cadastrar } from '../models/usuario.model.js';
import { ERRO_INTERNO_DO_SERVIDOR } from '../messages/erros.js';
import { formatarErrosZod } from '../utils/formatacoes.js';

const cadastroSchema = z.object({
  nome: z
    .string('Deve ser uma String')
    .trim()
    .min(1, 'Mínimo 1 caractere')
    .max(100, 'Máximo 100 caracteres'),
  email: z
    .string('Deve ser uma String')
    .trim()
    .min(6, 'Mínimo 6 caracteres')
    .max(150, 'Máximo 150 caracteres')
    .toLowerCase()
    .email('Deve ser um e-mail válido'),
  senha: z
    .string('Deve ser uma String')
    .trim()
    .min(8, 'Mínimo 8 caracteres')
    .max(64, 'Máximo 64 caracteres'),
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
    // Erro do Zod
    if (error instanceof z.ZodError) {
      return {
        codigo: 422,
        status: 'Unprocessable Entity',
        erros: formatarErrosZod(error.issues),
      };
    }

    /* ERROS DO BANCO */
    // E-mail já existente na tabela usuario
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        codigo: 400,
        status: 'Bad Request',
        mensagem: 'Já existe um usuário com o e-mail informado',
      };
    }

    return ERRO_INTERNO_DO_SERVIDOR;
  }
}
