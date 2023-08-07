import { getEnvVariables } from './envVariables';
import { loadEnv } from './loadEnv';

import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';

import 'express-async-errors';
import { initializeDataSource } from './database/dataSource';
import { createArticlesRouter } from './routers/articlesRouter';
import { seedUsers } from './database/seedUsers';
import { createAuthRouter } from './routers/authRouter';
import { createCommentsRouter } from './routers/commentsRouter';

import { Server } from 'ws';
import { commentCallbacks } from './database/commentSubscriber';

loadEnv();
const envVariables = getEnvVariables();

const app = express();

const corsOptions = {
  origin: envVariables.corsOrigin,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (envVariables.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

if (envVariables.nodeEnv === 'production') {
  app.use(helmet());
}

app.use('/articles', createArticlesRouter());
app.use('/auth', createAuthRouter());
app.use('/comments', createCommentsRouter());

initializeDataSource(envVariables)
  .then(seedUsers)
  .then(() => {
    return app.listen(envVariables.port, () =>
      console.info(`Server ready at http://localhost:${envVariables.port}`),
    );
  })
  .then((express) => new Server({ server: express }))
  .then((wsServer) => {
    wsServer.on('connection', (ws) => {
      commentCallbacks.afterInsertCallback = (comment) => {
        ws.send(JSON.stringify({ operation: 'INSERT', data: comment }));
      };

      commentCallbacks.afterVotingCallback = ({ commentId, votes }) => {
        ws.send(
          JSON.stringify({ operation: 'VOTE', data: { commentId, votes } }),
        );
      };
    });
  });
