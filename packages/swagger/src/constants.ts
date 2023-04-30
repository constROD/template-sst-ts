export const SWAGGER_ROUTES = {
  docs: {
    method: 'GET',
    path: '/',
  },
  swaggerJson: {
    method: 'GET',
    path: '/swagger.json',
  },
} as const;
