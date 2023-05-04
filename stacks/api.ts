import { Api, use, type StackContext } from 'sst/constructs';
import { Secrets } from './secrets';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'API', {
    routes: {
      /* Swagger Docs */
      'GET /': 'packages/swagger/src/functions/swagger.handler',
      'GET /swagger.json': 'packages/swagger/src/functions/swagger.handler',

      /* Persons */
      'GET /persons': 'packages/users/src/functions/persons-list.handler',
      'POST /persons': 'packages/users/src/functions/persons-create.handler',
      'GET /persons/{id}': 'packages/users/src/functions/persons-get.handler',
      'PUT /persons/{id}': 'packages/users/src/functions/persons-update.handler',
      'DELETE /persons/{id}': 'packages/users/src/functions/persons-delete.handler',
      'DELETE /persons/{id}/archive': 'packages/users/src/functions/persons-archive.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  api.bind([use(Secrets).VERSION]);
}
