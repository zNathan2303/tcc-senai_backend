import { BODY_AUSENTE, REQUISICAO_MAL_FORMULADA } from '../messages/erros.js';

export function verificarSeRequestBodyEValido(err, req, res, next) {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === 'entity.parse.failed'
  ) {
    const resposta = {
      ...REQUISICAO_MAL_FORMULADA,
      rota: req.originalUrl,
      data_hora: new Date().toLocaleString('pt-BR'),
    };
    return res.status(400).json(resposta);
  } else {
    next(err);
  }
}

export function verificarSeRequestTemBody(req, res, next) {
  if (!req.body) {
    const resposta = {
      ...BODY_AUSENTE,
      rota: req.originalUrl,
      data_hora: new Date().toLocaleString('pt-BR'),
    };
    return res.status(400).json(resposta);
  }
  next();
}
