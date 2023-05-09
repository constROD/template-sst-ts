import { version } from 'package.json';
import { archivePersonDocs } from 'src/rest/persons-archive';
import { createPersonDocs } from 'src/rest/persons-create';
import { deletePersonDocs } from 'src/rest/persons-delete';
import { getPersonDocs } from 'src/rest/persons-get';
import { listPersonDocs } from 'src/rest/persons-list';
import { updatePersonDocs } from 'src/rest/persons-update';
import swaggerJsdoc from 'swagger-jsdoc';
import { makeSwaggerPaths } from './helpers';

const personsDocs = makeSwaggerPaths([
  archivePersonDocs,
  createPersonDocs,
  deletePersonDocs,
  getPersonDocs,
  listPersonDocs,
  updatePersonDocs,
]);

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
