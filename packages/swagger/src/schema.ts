import { version } from 'package.json';
import swaggerJsdoc from 'swagger-jsdoc';
import { usersDocs } from './docs/users';

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `Service API`,
      version,
    },
    paths: {
      ...usersDocs,
    },
  },
  apis: [],
};

export const swaggerDefinition = swaggerJsdoc(options);
