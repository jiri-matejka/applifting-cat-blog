export type NodeEnvironment = 'development' | 'production';

export type EnvVariables = ReturnType<typeof getEnvVariables>;

/* eslint-disable node/no-process-env */
export const getEnvVariables = () => {
  if (!process.env.NODE_ENV) throw new Error('Missing NODE_ENV');

  return {
    nodeEnv: process.env.NODE_ENV as NodeEnvironment,
    port: process.env.PORT ? Number(process.env.PORT) : 0,
    jwt: {
      Secret: process.env.JWT_SECRET ?? '',
      Exp: process.env.JWT_EXP ?? '',
    },
    corsOrigin: process.env.CORS_ORIGIN ?? '',
    postgres: {
      host: process.env.POSTGRES_HOST ?? '',
      port: process.env.PORT ? Number(process.env.POSTGRES_PORT) : 5432,
      username: process.env.POSTGRES_USERNAME ?? '',
      password: process.env.POSTGRES_PASSWORD ?? '',
      database: process.env.POSTGRES_DATABASE ?? '',
    },
  } as const;
};
