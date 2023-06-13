import { DEFAULT_DB_CONFIG } from '@core/constants/db';
import { mysqlConnection } from '@core/db/connections';
import { PersonService } from '@core/services/person';
import { makeAPIResponse } from 'shared/utils/http';
import { ApiHandler } from 'sst/node/api';
import type swaggerJSDoc from 'swagger-jsdoc';

const db = mysqlConnection(DEFAULT_DB_CONFIG);

/* Handler */
export const handler = ApiHandler(async () => {
  try {
    const { records, totalRecords } = await PersonService.list({ db });
    return makeAPIResponse({
      type: 'Success',
      data: { records, totalRecords },
    });
  } catch (error) {
    return makeAPIResponse({ type: 'ServerError' });
  }
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
