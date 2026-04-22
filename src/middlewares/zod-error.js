import { ZodError } from 'zod';
import { ZodValidationError } from '../errors/ZodValidationError.js';

export function zodErrorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    const zodError = new ZodValidationError(err.issues, req.originalUrl);
    return res.status(zodError.codigo).json(zodError);
  }
  next();
}
