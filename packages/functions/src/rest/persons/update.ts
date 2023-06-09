import { mysqlConnection } from '@core/db/connections';
import { PersonService } from '@core/services/person';
import { makeAPIResponse } from 'shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';
import { z } from 'zod';

const db = mysqlConnection();

/* Validator */
const updatePersonSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().trim().optional(),
  last_name: z.string().trim().optional(),
});

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = updatePersonSchema.safeParse({
    ...event.pathParameters,
    ...JSON.parse(event.body || '{}'),
  });

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const { id, ...values } = validated.data;

  try {
    await PersonService.update({ db, id, values });
    return makeAPIResponse({ type: 'Updated', data: { message: 'Updated successfully' } });
  } catch (error) {
    return makeAPIResponse({ type: 'ServerError' });
  }
});

/* Docs */
export const updatePersonDocs: swaggerJSDoc.Paths = {
  '/persons/{id}': {
    put: {
      description: 'Update a person by {id}.',
      tags: ['Persons'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
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
                  default: 'string (optional)',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of person.',
                  default: 'string (optional)',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Person updated.',
        },
      },
    },
  },
};
