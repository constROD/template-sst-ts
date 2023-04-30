import { API_RESOURCES } from './common';

export const USERS_API_ROUTES = {
  listOfUsers: {
    method: 'GET',
    path: `/${API_RESOURCES.Users}`,
    filePath: `packages/${API_RESOURCES.Users}/src/functions/users-list.handler`,
  },
  getUser: {
    method: 'GET',
    path: `/${API_RESOURCES.Users}/{id}`,
    filePath: `packages/${API_RESOURCES.Users}/src/functions/users-get.handler`,
  },
  createUser: {
    method: 'POST',
    path: `/${API_RESOURCES.Users}`,
    filePath: `packages/${API_RESOURCES.Users}/src/functions/users-create.handler`,
  },
  updateUser: {
    method: 'PUT',
    path: `/${API_RESOURCES.Users}/{id}`,
    filePath: `packages/${API_RESOURCES.Users}/src/functions/users-update.handler`,
  },
  deleteUser: {
    method: 'DELETE',
    path: `/${API_RESOURCES.Users}/{id}`,
    filePath: `packages/${API_RESOURCES.Users}/src/functions/users-delete.handler`,
  },
  archiveUser: {
    method: 'DELETE',
    path: `/${API_RESOURCES.Users}/{id}/archive`,
    filePath: `packages/${API_RESOURCES.Users}/src/functions/users-archive.handler`,
  },
} as const;
