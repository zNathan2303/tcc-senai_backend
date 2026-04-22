import ApiError from './ApiError.js';

export default class UnauthorizedError extends ApiError {
  constructor(mensagem) {
    super(mensagem, 401);
  }
}
