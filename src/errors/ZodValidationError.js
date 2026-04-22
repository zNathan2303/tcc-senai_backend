import { formatarErrosZod } from '../utils/formatacoes.js';

export default class ZodValidationError extends Error {
  dataHora = new Date().toLocaleString('pt-BR');
  codigo = 422;

  constructor(erros) {
    super();
    this.erros = formatarErrosZod(erros);
  }
}
