import { API } from '@lib/constants';

export const ROUTES = {
  listOfSamples: {
    method: 'GET',
    path: `/${API.Samples}`,
  },
  getSample: {
    method: 'GET',
    path: `/${API.Samples}/{id}`,
  },
  createSample: {
    method: 'POST',
    path: `/${API.Samples}`,
  },
  updateSample: {
    method: 'PUT',
    path: `/${API.Samples}/{id}`,
  },
  deleteSample: {
    method: 'DELETE',
    path: `/${API.Samples}/{id}`,
  },
  archiveSample: {
    method: 'DELETE',
    path: `/${API.Samples}/{id}/archive`,
  },
} as const;
