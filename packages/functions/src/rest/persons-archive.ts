import { mysqlConnection } from '@core/db/connections';
import * as PersonService from '@core/services/person';
import { makeAPIResponse } from 'src/shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';
import { z } from 'zod';

const db = mysqlConnection();

/* Validator */
const archivePersonSchema = z.object({ id: z.string().uuid() });

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = archivePersonSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await PersonService.archive({ db, id: validated.data.id });

  return makeAPIResponse({ type: 'Archived', data: { records } });
});

/* Docs */
export const archivePersonDocs: swaggerJSDoc.Paths = {
  '/persons/{id}/archive': {
    delete: {
      description: 'Archive a person by {id}.',
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
          description: 'Persons archived.',
        },
      },
    },
  },
};
