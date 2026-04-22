import { ZodError } from 'zod';
import ZodValidationError from '../errors/ZodValidationError.js';

export function zodErrorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    const zodError = new ZodValidationError(err.issues);
    return res.status(zodError.codigo).json({
      codigo: zodError.codigo,
      erros: zodError.erros,
      rota: req.originalUrl,
      data_hora: zodError.dataHora,
    });
  }
  next(err);
}
