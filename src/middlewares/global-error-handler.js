import { ApiError } from '../errors/ApiError.js';

export function globalErrorHandler(err, req, res, next) {
  const serverError = new ApiError({ rota: req.originalUrl });
  return res.status(serverError.codigo).json(serverError);
}
