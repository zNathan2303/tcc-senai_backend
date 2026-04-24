import z from 'zod';
import * as usuarioModel from '../models/usuario.model.js';
import NotFoundError from '../errors/NotFoundError.js';

const nomeSchema = z.object({
  nome: z
    .string('Deve ser uma String')
    .trim()
    .min(1, 'Mínimo 1 caractere')
    .max(100, 'Máximo 100 caracteres'),
});

const emailSchema = z
  .string('Deve ser uma String')
  .email('E-mail inválido')
  .min(6, 'Mínimo 6 caracteres')
  .max(150, 'Máximo 150 caracteres');

export async function atualizarNomeDoUsuario(usuario, requestBody) {
  const { nome } = nomeSchema.parse(requestBody);

  await usuarioModel.atualizarNome(usuario.id, nome);
}

export async function desativarUsuario(usuario) {
  await usuarioModel.desativar(usuario.id);
}

export async function obter5UsuariosQueEmailContemValor(valor) {
  const usuarios = await usuarioModel.obter5QueEmailContemValor(valor);

  return usuarios;
}

export async function obterUsuarioPorEmail(email) {
  const emailValidado = emailSchema.parse(email);

  const usuario = await usuarioModel.obterPorEmail(emailValidado);

  if (!usuario) {
    throw new NotFoundError('Usuário não encontrado');
  }

  return usuario;
}
