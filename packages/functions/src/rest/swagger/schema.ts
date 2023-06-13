import { version } from 'package.json';
import { archivePersonDocs } from 'rest/persons/archive';
import { createPersonDocs } from 'rest/persons/create';
import { deletePersonDocs } from 'rest/persons/delete';
import { getPersonDocs } from 'rest/persons/get';
import { listPersonDocs } from 'rest/persons/list';
import { updatePersonDocs } from 'rest/persons/update';
import { SWAGGER_TITLE } from 'shared/constants/swagger';
import { makeSwaggerPaths } from 'shared/utils/swagger';
import swaggerJsdoc from 'swagger-jsdoc';

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
      title: SWAGGER_TITLE,
      version,
    },
    paths: {
      ...personsDocs,
    },
  },
  apis: [],
};

export const swaggerDefinition = swaggerJsdoc(options);
