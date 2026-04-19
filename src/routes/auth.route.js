import { Router } from 'express';
import { cadastrarUsuario } from '../controllers/auth.controller.js';

const router = Router();

router.post('/cadastrar', async (req, res) => {
  const { nome, email, senha } = req.body;

  const resultadoController = await cadastrarUsuario({ email, nome, senha });

  res.status(200).json(resultadoController);
});

export default router;
