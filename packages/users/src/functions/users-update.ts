import { type APIGatewayEventType } from '@lib/types';
import { makeAPIResponse } from '@lib/utils';
import { usersService } from 'src/modules/users/services';
import { updateUserSchema } from 'src/modules/users/validations';
import { ApiHandler } from 'sst/node/api';

/* Handler */
export const handler = ApiHandler(async _event => {
  const event = _event as unknown as APIGatewayEventType<{ body: Record<string, unknown> }>;
  const validated = updateUserSchema.safeParse({
    ...event.pathParameters,
    ...event.body,
  });

  if (!validated.success)
    return makeAPIResponse({ type: 'BadRequest', error: { errors: validated.error } });

  const { id, ...values } = validated.data;

  const records = await usersService.update(id, values);

  return makeAPIResponse({ type: 'Updated', data: { records } });
});
