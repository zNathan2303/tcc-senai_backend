import * as z from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cadastrar, obterPorEmail } from '../models/usuario.model.js';
import { EMAIL_OU_SENHA_INCORRETOS } from '../messages/erros.js';

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
  const { email, nome, senha } = cadastroSchema.parse(cadastroBody);

  const salt = 10;
  const senhaHash = await bcrypt.hash(senha, salt);

  const id = await cadastrar(email, nome, senhaHash);

  return {
    id,
    nome,
    email,
  };
}

export async function logarUsuario(loginBody) {
  const { email, senha } = loginSchema.parse(loginBody);

  const usuario = await obterPorEmail(email);
  if (!usuario) {
    return EMAIL_OU_SENHA_INCORRETOS;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return EMAIL_OU_SENHA_INCORRETOS;
  }

  const payload = {
    id: usuario.id,
    email: usuario.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}
