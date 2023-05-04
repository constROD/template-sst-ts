import { SWAGGER_ROUTES } from 'src/constants';
import { swaggerDefinition } from 'src/schema';
import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async event => {
  const title = 'bossROD TV API';

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
        <title>${title}</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
    </head>
    <body>
        <div id="swagger"></div>
        <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
            dom_id: '#swagger',
            url: '${SWAGGER_ROUTES.swaggerJson.path}'
        });
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
