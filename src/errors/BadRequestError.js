import ApiError from './ApiError.js';

export default class BadRequestError extends ApiError {
  constructor(mensagem) {
    super(mensagem, 400);
  }
}
