import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export function validarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Não autenticado');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;
    next();
  } catch (err) {
    throw new UnauthorizedError('Token inválido ou expirado');
  }
}
