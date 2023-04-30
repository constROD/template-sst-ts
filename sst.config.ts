import { SSTConfig } from 'sst';
import { UsersAPI } from './stacks/users';

export default {
  config(_input) {
    return {
      name: 'template-sst-ts',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(UsersAPI);
  },
} satisfies SSTConfig;
