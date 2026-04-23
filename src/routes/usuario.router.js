import { Router } from 'express';
import { verificarSeRequestTemBody } from '../middlewares/request-body.js';
import { validarToken } from '../middlewares/auth.js';
import * as usuarioController from '../controllers/usuario.controller.js';
import BadRequestError from '../errors/BadRequestError.js';

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
  res.sendStatus(204);
});

router.get('/usuarios', validarToken, async (req, res) => {
  const email = req.query.email;

  if (!email) {
    throw new BadRequestError(
      "Informe o parâmetro 'email' para realizar a busca.",
    );
  }

  const usuarios =
    await usuarioController.obter5UsuariosQueEmailContemValor(email);

  res.status(200).json(usuarios);
});

export default router;
