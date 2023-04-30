import { makeAPIResponse } from '@lib/utils/http';
import { usersService } from 'src/modules/users/services';
import { ApiHandler } from 'sst/node/api';

/* Handler */
export const handler = ApiHandler(async () => {
  const { records, totalRecords } = await usersService.list();

  return makeAPIResponse({
    type: 'Success',
    data: { records, totalRecords },
  });
});
