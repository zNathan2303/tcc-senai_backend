import { Router } from 'express';
import {
  cadastrarUsuario,
  logarUsuario,
} from '../controllers/auth.controller.js';
import { formatarResposta } from '../utils/formatacoes.js';
import { verificarSeRequestTemBody } from '../middlewares/request-body.js';

const router = Router();

router.post('/cadastrar', verificarSeRequestTemBody, async (req, res) => {
  const resultado = await cadastrarUsuario(req.body);

  const resposta = formatarResposta(resultado, req.originalUrl);
  const codigo = resposta.codigo || 201;

  return res.status(codigo).json(resposta);
});

router.post('/login', verificarSeRequestTemBody, async (req, res) => {
  const resultado = await logarUsuario(req.body);

  const resposta = formatarResposta(resultado, req.originalUrl);
  const codigo = resultado.codigo || 200;

  return res.status(codigo).json(resposta);
});

export default router;
