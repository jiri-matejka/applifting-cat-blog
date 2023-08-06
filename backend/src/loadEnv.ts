import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'ts-command-line-args';

interface IArgs {
  env: string;
}

export function loadEnv() {
  const args = parse<IArgs>({
    env: {
      type: String,
      defaultValue: 'development',
      alias: 'e',
    },
  });

  const result = dotenv.config({
    path: path.join(__dirname, `../env/${args.env}.env`),
  });

  if (result.error) {
    throw result.error;
  }
}
