import { Router } from 'express';
import {
  cadastrarUsuario,
  logarUsuario,
} from '../controllers/auth.controller.js';
import { verificarSeRequestTemBody } from '../middlewares/request-body.js';

const router = Router();

router.post('/cadastrar', verificarSeRequestTemBody, async (req, res) => {
  const resultado = await cadastrarUsuario(req.body);
  return res.status(201).json(resultado);
});

router.post('/login', verificarSeRequestTemBody, async (req, res) => {
  const resultado = await logarUsuario(req.body);
  return res.status(200).json(resultado);
});

export default router;
