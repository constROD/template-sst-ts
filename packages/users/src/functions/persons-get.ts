import { makeAPIResponse } from '@core/utils/http';
import { db } from 'src/db';
import { PersonService } from 'src/modules/persons/services';
import { getPersonSchema } from 'src/modules/persons/validations';
import { ApiHandler } from 'sst/node/api';

const personService = new PersonService(db);

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = getPersonSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await personService.get(validated.data.id);

  return makeAPIResponse({ type: 'Success', data: { records } });
});
