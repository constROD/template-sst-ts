import { mysqlConnection } from '@core/db/connections';
import * as PersonService from '@core/services/person';
import { makeAPIResponse } from 'shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';
import { z } from 'zod';

const db = mysqlConnection();

/* Validator */
const deletePersonSchema = z.object({ id: z.string().uuid() });

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = deletePersonSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  try {
    await PersonService.remove({ db, id: validated.data.id });
    return makeAPIResponse({ type: 'Deleted', data: { message: 'Deleted successfully' } });
  } catch (error) {
    return makeAPIResponse({ type: 'ServerError' });
  }
});

/* Docs */
export const deletePersonDocs: swaggerJSDoc.Paths = {
  '/persons/{id}': {
    delete: {
      description: 'Delete a person by {id}.',
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
          description: 'Person deleted.',
        },
      },
    },
  },
};
