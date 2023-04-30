import { Api, type StackContext } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /': 'packages/api/src/lambda.handler',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
