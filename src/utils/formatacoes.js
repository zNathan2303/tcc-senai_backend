export function formatarErrosZod(errosZod) {
  return errosZod.map((erro) => ({
    campo: erro.path[0],
    mensagem: erro.message,
  }));
}
