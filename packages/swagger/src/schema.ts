import { version } from 'package.json';
import swaggerJsdoc from 'swagger-jsdoc';
import { personsDocs } from './docs/persons';

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `bossROD TV API`,
      version,
    },
    paths: {
      ...personsDocs,
    },
  },
  apis: [],
};

export const swaggerDefinition = swaggerJsdoc(options);
