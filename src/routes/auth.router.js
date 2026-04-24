import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { verificarSeRequestTemBody } from '../middlewares/request-body.js';

const router = Router();

router.post('/auth/cadastrar', verificarSeRequestTemBody, async (req, res) => {
  const resultado = await authController.cadastrarUsuario(req.body);
  return res.status(201).json(resultado);
});

router.post('/auth/login', verificarSeRequestTemBody, async (req, res) => {
  const resultado = await authController.logarUsuario(req.body);
  return res.status(200).json(resultado);
});

export default router;
