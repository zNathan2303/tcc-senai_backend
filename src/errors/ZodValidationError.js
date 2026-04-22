import { formatarErrosZod } from '../utils/formatacoes.js';

export class ZodValidationError extends Error {
  dataHora = new Date().toLocaleString('pt-BR');
  codigo = 422;

  constructor(erros, rota) {
    super();
    this.erros = formatarErrosZod(erros);
    this.rota = rota;
  }
}
