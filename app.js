import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import router from './src/routes/index.js';
import { swaggerSpec } from './src/config/swagger.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.use('/api/v1', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0];
    return res.status(409).json({
      success: false,
      message: field === 'nickname' ? '이미 사용 중인 닉네임입니다.' : '이미 사용 중인 값입니다.',
    });
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '서버 내부 오류가 발생했습니다.',
  });
});

app.listen(PORT, () => {
  console.log(`Hisspot server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

export default app;
