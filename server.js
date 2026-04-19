import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import router from './src/routes/index.js';

const app = express();
const PORT = process.PORT || 8080;
const swaggerDocument = YAML.load('./swagger.yaml');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Aguardando requisições na porta: ${PORT}`);
  console.log('Swagger na rota: /api/docs');
});
