import { Router } from 'express';
import { verificarSeRequestTemBody } from '../middlewares/request-body.js';
import { validarToken } from '../middlewares/auth.js';
import * as usuarioController from '../controllers/usuario.controller.js';

const router = Router();

router.patch(
  '/usuario/nome',
  validarToken,
  verificarSeRequestTemBody,
  async (req, res) => {
    await usuarioController.atualizarNomeDoUsuario(req.usuario, req.body);
    res.sendStatus(204);
  },
);

router.delete('/usuario', validarToken, async (req, res) => {
  await usuarioController.desativarUsuario(req.usuario);
});

router.get('/usuarios', validarToken, async (req, res) => {});

export default router;
