import { ERRO_DE_REQUISICAO } from '../messages/erros.js';

export function verificarSeRequestBodyEJSON(err, req, res, next) {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.type === 'entity.parse.failed'
  ) {
    const resposta = {
      ...ERRO_DE_REQUISICAO,
      rota: req.originalUrl,
      data_hora: new Date().toLocaleString('pt-BR'),
    };
    return res.status(400).json(resposta);
  } else {
    next(err);
  }
}
