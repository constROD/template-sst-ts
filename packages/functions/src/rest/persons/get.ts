import { DEFAULT_DB_CONFIG } from '@core/constants/db';
import { mysqlConnection } from '@core/db/connections';
import { PersonService } from '@core/services/person';
import { makeAPIResponse } from 'shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';
import { z } from 'zod';

const db = mysqlConnection(DEFAULT_DB_CONFIG);

/* Validator */
const getPersonSchema = z.object({ id: z.string().uuid() });

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = getPersonSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  try {
    const records = await PersonService.get({ db, id: validated.data.id });
    return makeAPIResponse({ type: 'Success', data: { records } });
  } catch (error) {
    return makeAPIResponse({ type: 'ServerError' });
  }
});

/* Docs */
export const getPersonDocs: swaggerJSDoc.Paths = {
  '/persons/{id}': {
    get: {
      description: 'Get a person by {id}.',
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
      responses: {
        200: {
          description: 'A single person.',
        },
      },
    },
  },
};
