import logger from 'jet-logger';

import { envVariables } from '@src/constants/envVariables';
import { loadEnv } from './loadEnv';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from '@src/routes/api';
import Paths from '@src/routes/constants/Paths';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';

loadEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envVariables.CookieProps.Secret));

// Show routes called in console during development
if (envVariables.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (envVariables.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

server.listen(envVariables.Port, () => logger.info(SERVER_START_MSG));
