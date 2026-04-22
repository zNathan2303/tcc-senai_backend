export default class ApiError extends Error {
  dataHora = new Date().toLocaleString('pt-BR');

  constructor(mensagem = 'Erro Interno no Servidor', codigo = 500) {
    super(mensagem);
    this.mensagem = mensagem;
    this.codigo = codigo;
  }
}
