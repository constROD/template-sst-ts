import { makeAPIResponse } from '@core/utils/http';
import { db } from 'src/db';
import { PersonService } from 'src/modules/persons/services';
import { ApiHandler } from 'sst/node/api';

const personService = new PersonService(db);

/* Handler */
export const handler = ApiHandler(async () => {
  const { records, totalRecords } = await personService.list();

  return makeAPIResponse({
    type: 'Success',
    data: { records, totalRecords },
  });
});
