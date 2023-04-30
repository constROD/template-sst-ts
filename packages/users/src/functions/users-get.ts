import { makeAPIResponse } from '@lib/utils/http';
import { usersService } from 'src/modules/users/services';
import { getUserSchema } from 'src/modules/users/validations';
import { ApiHandler } from 'sst/node/api';

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = getUserSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await usersService.get(validated.data.id);

  return makeAPIResponse({ type: 'Success', data: { records } });
});
