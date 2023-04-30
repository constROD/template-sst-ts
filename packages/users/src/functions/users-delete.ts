import { makeAPIResponse } from '@lib/utils';
import { usersService } from 'src/modules/users/services';
import { deleteUserSchema } from 'src/modules/users/validations';
import { ApiHandler } from 'sst/node/api';

/* Handler */
export const handler = ApiHandler(async event => {
  const validated = deleteUserSchema.safeParse(event.pathParameters);

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const records = await usersService.delete([validated.data.id]);

  return makeAPIResponse({ type: 'Deleted', data: { records } });
});
