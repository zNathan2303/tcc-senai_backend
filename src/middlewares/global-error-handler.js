import ApiError from '../errors/ApiError.js';

export function globalErrorHandler(err, req, res, next) {
  if (err.codigo) {
    return res.status(err.codigo).json({
      codigo: err.codigo,
      mensagem: err.mensagem,
      rota: req.originalUrl,
      data_hora: err.dataHora,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  const serverError = new ApiError();
  return res.status(serverError.codigo).json({
    codigo: serverError.codigo,
    mensagem: serverError.mensagem,
    rota: req.originalUrl,
    data_hora: serverError.dataHora,
  });
}
