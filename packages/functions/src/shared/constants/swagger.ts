import { CommonUtil } from '@core/utils/commons';
import { Config } from 'sst/node/config';

export const SWAGGER_ROUTES = {
  docs: {
    method: 'GET',
    path: '/',
  },
  swaggerJson: {
    method: 'GET',
    path: '/swagger.json',
  },
} as const;

export const SWAGGER_TITLE = `bossROD TV API - ${CommonUtil.transformToPascal(
  Config.STAGE as string
)}`;
