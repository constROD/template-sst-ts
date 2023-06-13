import { Config } from 'sst/node/config';

export const DEFAULT_DB_CONFIG = {
  host: Config.DB_HOST,
  port: Config.DB_PORT ? Number(Config.DB_PORT) : 3306,
  user: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
};
