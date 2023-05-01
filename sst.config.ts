import { SSTConfig } from 'sst';
import { API } from './stacks/api';

const esbuild = {
  target: 'node16',
  bundle: true,
  minify: false,
  sourcemap: true,
  external: [
    'aws-sdk',

    /* Packages below are packages unnecessarily required by Knex.js */
    'mysql',
    'mysql2',
    'better-sqlite3',
    'pg-query-stream',
    'tedious',
    'oracledb',
    'sqlite3',
  ],
};

export default {
  config(_input) {
    return {
      name: 'template-sst-ts',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({ nodejs: { esbuild } });
    app.stack(API);
  },
} satisfies SSTConfig;
