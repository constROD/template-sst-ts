import { Config, type StackContext } from 'sst/constructs';

export function Secrets({ stack }: StackContext) {
  const DB_HOST = new Config.Secret(stack, 'DB_HOST');
  const DB_PORT = new Config.Secret(stack, 'DB_PORT');
  const DB_USER = new Config.Secret(stack, 'DB_USER');
  const DB_PASSWORD = new Config.Secret(stack, 'DB_PASSWORD');
  const DB_NAME = new Config.Secret(stack, 'DB_NAME');

  return {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  };
}
