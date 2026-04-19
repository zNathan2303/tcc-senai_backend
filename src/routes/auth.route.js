import { Router } from 'express';
import { cadastrarUsuario } from '../controllers/auth.controller.js';

const router = Router();

router.post('/cadastrar', async (req, res) => {
  const { nome, email, senha } = req.body;

  const resultado = await cadastrarUsuario({ email, nome, senha });

  console.log(resultado);

  res.status(200).json(resultado);
});

export default router;
