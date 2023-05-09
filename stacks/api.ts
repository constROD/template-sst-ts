import { Api, use, type StackContext } from 'sst/constructs';
import { Secrets } from './secrets';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'API', {
    routes: {
      /* Swagger Docs */
      'GET /': 'packages/functions/src/rest/swagger.handler',
      'GET /swagger.json': 'packages/functions/src/rest/swagger.handler',

      /* Persons */
      'GET /persons': 'packages/functions/src/rest/persons-list.handler',
      'POST /persons': 'packages/functions/src/rest/persons-create.handler',
      'GET /persons/{id}': 'packages/functions/src/rest/persons-get.handler',
      'PUT /persons/{id}': 'packages/functions/src/rest/persons-update.handler',
      'DELETE /persons/{id}': 'packages/functions/src/rest/persons-delete.handler',
      'DELETE /persons/{id}/archive': 'packages/functions/src/rest/persons-archive.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  api.bind([use(Secrets).VERSION]);
}
