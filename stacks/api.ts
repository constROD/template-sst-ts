import { Api, use, type StackContext } from 'sst/constructs';
import { Secrets } from './secrets';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'API', {
    routes: {
      /* Swagger Docs */
      'GET /': 'packages/swagger/src/functions/swagger.handler',
      'GET /swagger.json': 'packages/swagger/src/functions/swagger.handler',

      /* Users */
      'GET /users': 'packages/users/src/functions/users-list.handler',
      'POST /users': 'packages/users/src/functions/users-create.handler',
      'GET /users/{id}': 'packages/users/src/functions/users-get.handler',
      'PUT /users/{id}': 'packages/users/src/functions/users-update.handler',
      'DELETE /users/{id}': 'packages/users/src/functions/users-delete.handler',
      'DELETE /users/{id}/archive': 'packages/users/src/functions/users-archive.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  api.bind([use(Secrets).TEST]);
}
