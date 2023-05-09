import { connection } from '@core/db/connection';
import * as PersonService from '@core/services/person';
import { makeAPIResponse } from 'src/shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';

const db = connection();

/* Handler */
export const handler = ApiHandler(async () => {
  const { records, totalRecords } = await PersonService.list({ db });

  return makeAPIResponse({
    type: 'Success',
    data: { records, totalRecords },
  });
});

/* Docs */
export const listPersonDocs: swaggerJSDoc.Paths = {
  '/persons': {
    get: {
      description: 'Get list of persons.',
      tags: ['Persons'],
      responses: {
        200: {
          description: 'List of persons.',
        },
      },
    },
  },
};
