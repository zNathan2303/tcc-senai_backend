import { ApiError } from './ApiError.js';

export class EmailAlreadyExists extends ApiError {
  constructor() {
    super({
      codigo: 409,
      mensagem: 'Não é possível utilizar o e-mail informado para cadastro',
    });
  }
}
