export const REQUISICAO_MAL_FORMULADA = {
  codigo: 400,
  status: 'Bad Request',
  mensagem: 'Requisição mal formulada',
};

export const EMAIL_OU_SENHA_INCORRETOS = {
  erro: true,
  codigo: 401,
  status: 'Unauthorized',
  mensagem: 'E-mail ou senha incorretos',
};

export const VARIAVEL_JWT_SECRET_AUSENTE = {
  codigo: 500,
  status: 'Internal Server Error',
  mensagem: 'Variável JWT_SECRET não encontrada',
};

export const BODY_AUSENTE = {
  codigo: 400,
  status: 'Bad Request',
  mensagem: 'Requisição está sem o body',
};
