import { SWAGGER_ROUTES, SWAGGER_TITLE } from 'shared/constants/swagger';
import { ApiHandler } from 'sst/node/api';
import { swaggerDefinition } from './schema';

export const handler = ApiHandler(async event => {
  if (event.rawPath === SWAGGER_ROUTES.swaggerJson.path) {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(swaggerDefinition),
    };
  }

  const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${SWAGGER_TITLE}</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
    </head>
    <body>
        <div id="swagger"></div>
        <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
            dom_id: '#swagger',
            url: '${SWAGGER_ROUTES.swaggerJson.path}'
        });a
        </script>
    </body>
    </html>`;

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html',
    },
    body,
  };
});
