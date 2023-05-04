import { type APIGatewayEventType } from '@core/types';
import { makeAPIResponse } from '@core/utils';
import { db } from 'src/db';
import { PersonService } from 'src/modules/persons/services';
import { updatePersonSchema } from 'src/modules/persons/validations';
import { ApiHandler } from 'sst/node/api';

const personService = new PersonService(db);

/* Handler */
export const handler = ApiHandler(async _event => {
  const event = _event as unknown as APIGatewayEventType<{ body: Record<string, unknown> }>;
  const validated = updatePersonSchema.safeParse({
    ...event.pathParameters,
    ...event.body,
  });

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const { id, ...values } = validated.data;

  const records = await personService.update(id, values);

  return makeAPIResponse({ type: 'Updated', data: { records } });
});
