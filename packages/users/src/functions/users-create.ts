import { makeAPIResponse } from '@lib/utils';
import { usersService } from 'src/modules/users/services';
import { createUserSchema } from 'src/modules/users/validations';
import { ApiHandler } from 'sst/node/api';

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = createUserSchema.safeParse(event.body);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await usersService.create(validated.data);

  return makeAPIResponse({ type: 'Created', data: { records } });
});
