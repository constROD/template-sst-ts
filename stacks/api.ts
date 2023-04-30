import { Api, type StackContext } from 'sst/constructs';

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

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'API', {
    routes: {
      /* Swagger Docs */
      'GET /': {
        function: {
          handler: 'packages/swagger/src/functions/swagger.handler',
          nodejs: { esbuild },
        },
      },
      'GET /swagger.json': {
        function: {
          handler: 'packages/swagger/src/functions/swagger.handler',
          nodejs: { esbuild },
        },
      },

      /* Users */
      'GET /users': {
        function: {
          handler: 'packages/users/src/functions/users-list.handler',
          nodejs: { esbuild },
        },
      },
      'POST /users': {
        function: {
          handler: 'packages/users/src/functions/users-create.handler',
          nodejs: { esbuild },
        },
      },
      'GET /users/{id}': {
        function: {
          handler: 'packages/users/src/functions/users-get.handler',
          nodejs: { esbuild },
        },
      },
      'PUT /users/{id}': {
        function: {
          handler: 'packages/users/src/functions/users-update.handler',
          nodejs: { esbuild },
        },
      },
      'DELETE /users/{id}': {
        function: {
          handler: 'packages/users/src/functions/users-delete.handler',
          nodejs: { esbuild },
        },
      },
      'DELETE /users/{id}/archive': {
        function: {
          handler: 'packages/users/src/functions/users-archive.handler',
          nodejs: { esbuild },
        },
      },
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
