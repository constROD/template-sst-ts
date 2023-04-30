import { API } from './common';

export const USERS_ROUTES = {
  handler: 'packages/lib/src/lambda.handler',
  routes: {
    listOfUsers: {
      method: 'GET',
      path: `/${API.Users}`,
    },
    getSample: {
      method: 'GET',
      path: `/${API.Users}/{id}`,
    },
    createSample: {
      method: 'POST',
      path: `/${API.Users}`,
    },
    updateSample: {
      method: 'PUT',
      path: `/${API.Users}/{id}`,
    },
    deleteSample: {
      method: 'DELETE',
      path: `/${API.Users}/{id}`,
    },
    archiveSample: {
      method: 'DELETE',
      path: `/${API.Users}/{id}/archive`,
    },
  },
} as const;
