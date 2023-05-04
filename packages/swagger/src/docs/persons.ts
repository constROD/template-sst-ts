import type swaggerJSDoc from 'swagger-jsdoc';

export const personsDocs: swaggerJSDoc.Paths = {
  '/persons': {
    get: {
      description: 'Get list of persons.',
      tags: ['Persons'],
      responses: {
        200: {
          description: 'List of persons.',
        },
      },
    },
    post: {
      description: 'Create a person.',
      tags: ['Persons'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                  description: 'First name of person.',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of person.',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Person created.',
        },
      },
    },
  },
  '/persons/{id}': {
    get: {
      description: 'Get a person by {id}.',
      tags: ['Persons'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      responses: {
        200: {
          description: 'A single person.',
        },
      },
    },
    put: {
      description: 'Update a person by {id}.',
      tags: ['Persons'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                  description: 'First name of person.',
                  default: 'string (optional)',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of person.',
                  default: 'string (optional)',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Person updated.',
        },
      },
    },
    delete: {
      description: 'Delete a person by {id}.',
      tags: ['Persons'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Person deleted.',
        },
      },
    },
  },
  '/persons/{id}/archive': {
    delete: {
      description: 'Archive a person by {id}.',
      tags: ['Persons'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      responses: {
        200: {
          description: 'Person archived.',
        },
      },
    },
  },
};
