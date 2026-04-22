import ApiError from './ApiError.js';

export default class ConflictError extends ApiError {
  constructor(mensagem) {
    super(mensagem, 409);
  }
}
