import { Time } from '@lib/utils';
import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async () => ({
  body: `Hi Nick. The current time is: ${Time.now()} ❌`,
}));
