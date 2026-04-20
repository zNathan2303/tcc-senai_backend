import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import router from './src/routes/index.js';
import { verificarSeRequestBodyEValido } from './src/middlewares/request-body.js';

const app = express();
const PORT = process.env.PORT || 8080;
const swaggerDocument = YAML.load('./swagger.yaml');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

// Configs
app.use(express.json());
app.use(cors(corsOptions));

// Rotas
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

// Middlewares de erro
app.use(verificarSeRequestBodyEValido);

app.listen(PORT, () => {
  console.log(`Aguardando requisições na porta: ${PORT}`);
  console.log('Swagger local na rota: http://localhost:8080/api/docs');
});
