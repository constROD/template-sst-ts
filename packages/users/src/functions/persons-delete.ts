import { makeAPIResponse } from '@core/utils';
import { db } from 'src/db';
import { PersonService } from 'src/modules/persons/services';
import { deletePersonSchema } from 'src/modules/persons/validations';
import { ApiHandler } from 'sst/node/api';

const personService = new PersonService(db);

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = deletePersonSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await personService.delete(validated.data.id);

  return makeAPIResponse({ type: 'Deleted', data: { records } });
});
