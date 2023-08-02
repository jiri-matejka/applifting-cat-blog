/* eslint-disable node/no-process-env */
export const envVariables = {
  nodeEnv: process.env.NODE_ENV ?? '',
  port: process.env.PORT ?? 0,
  cookieProps: {
    key: 'applifting-blog-bff',
    secret: process.env.COOKIE_SECRET ?? '',
    // Casing to match express cookie options
    options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? '',
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: process.env.COOKIE_DOMAIN ?? '',
      secure: process.env.SECURE_COOKIE === 'true',
    },
  },
  jwt: {
    Secret: process.env.JWT_SECRET ?? '',
    Exp: process.env.COOKIE_EXP ?? '', // exp at the same time as the cookie
  },
} as const;
