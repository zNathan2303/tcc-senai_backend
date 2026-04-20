import { Router } from 'express';
import { cadastrarUsuario } from '../controllers/auth.controller.js';

const router = Router();

router.post('/cadastrar', async (req, res) => {
  const resultado = await cadastrarUsuario(req.body);

  if (resultado.codigo) {
    resultado.rota = req.originalUrl;
    resultado.data_hora = new Date().toLocaleString('pt-BR');
  }

  const codigo = resultado.codigo || 201;

  return res.status(codigo).json(resultado);
});

export default router;
