import { mysqlConnection } from '@core/db/connections';
import * as PersonService from '@core/services/person';
import { makeAPIResponse } from 'src/shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';
import { z } from 'zod';

const db = mysqlConnection();

/* Validator */
const createPersonSchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
});

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = createPersonSchema.safeParse(JSON.parse(event.body || '{}'));

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  try {
    await PersonService.create({ db, values: validated.data });
    return makeAPIResponse({ type: 'Created', data: { message: 'Created successfully' } });
  } catch (error) {
    return makeAPIResponse({ type: 'ServerError' });
  }
});

/* Docs */
export const createPersonDocs: swaggerJSDoc.Paths = {
  '/persons': {
    post: {
      description: 'Create a person.',
      tags: ['Persons'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                  description: 'First name of person.',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of person.',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Person created.',
        },
      },
    },
  },
};
