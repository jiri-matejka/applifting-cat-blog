import { getEnvVariables } from './envVariables';
import { loadEnv } from './loadEnv';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import logger from 'jet-logger';

import 'express-async-errors';
import { initializeDataSource } from './database/dataSource';
import { createArticlesRouter } from './routers/articles';

loadEnv();
const envVariables = getEnvVariables();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envVariables.cookieProps.secret));

// Show routes called in console during development
if (envVariables.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

if (envVariables.nodeEnv === 'production') {
  app.use(helmet());
}

app.use('/articles', createArticlesRouter());

initializeDataSource().then(() => {
  app.listen(envVariables.port, () =>
    logger.info(`Server ready at http://localhost:${envVariables.port}`),
  );
});
