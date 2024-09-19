import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import globalErrorHandler from './utils/global-error-handler';

dotenv.config();

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'Hello World' });
  });

  app.use('/api/v1', router);
  app.use(globalErrorHandler);

  return app;
};
