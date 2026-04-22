export class ApiError extends Error {
  dataHora = new Date().toLocaleString('pt-BR');

  constructor({ codigo = 500, mensagem = 'Erro Interno no Servidor', rota }) {
    super();
    this.mensagem = mensagem;
    this.codigo = codigo;
    this.rota = rota;
  }
}
