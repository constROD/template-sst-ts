import { makeAPIResponse } from '@core/utils';
import { db } from 'src/db';
import { PersonService } from 'src/modules/persons/services';
import { archivePersonSchema } from 'src/modules/persons/validations';
import { ApiHandler } from 'sst/node/api';

const personService = new PersonService(db);

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = archivePersonSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await personService.archive(validated.data.id);

  return makeAPIResponse({ type: 'Archived', data: { records } });
});
