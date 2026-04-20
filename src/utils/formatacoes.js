export function formatarErrosZod(errosZod) {
  return errosZod.map((erro) => ({
    campo: erro.path[0],
    mensagem: erro.message,
  }));
}

export function formatarResposta(resposta, url) {
  if (resposta.erro) {
    const respostaDeErro = formatarRespostaDeErro(resposta, url);
    return respostaDeErro;
  }

  return resposta;
}

function formatarRespostaDeErro(resposta, url) {
  delete resposta.erro;
  return {
    ...resposta,
    rota: url,
    data_hora: new Date().toLocaleString('pt-BR'),
  };
}
