import type swaggerJSDoc from 'swagger-jsdoc';

export const usersDocs: swaggerJSDoc.Paths = {
  '/users': {
    get: {
      description: 'Get list of users.',
      tags: ['Users'],
      responses: {
        200: {
          description: 'List of users.',
        },
      },
    },
    post: {
      description: 'Create a user.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                first_name: {
                  type: 'string',
                  description: 'First name of user.',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of user.',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User created.',
        },
      },
    },
  },
  '/users/{id}': {
    get: {
      description: 'Get a user by {id}.',
      tags: ['Users'],
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
          description: 'A single user.',
        },
      },
    },
    put: {
      description: 'Update a user by {id}.',
      tags: ['Users'],
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
                  description: 'First name of user.',
                  default: 'string (optional)',
                },
                last_name: {
                  type: 'string',
                  description: 'Last name of user.',
                  default: 'string (optional)',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated.',
        },
      },
    },
    delete: {
      description: 'Delete a user by {id}.',
      tags: ['Users'],
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
          description: 'User deleted.',
        },
      },
    },
  },
  '/users/{id}/archive': {
    delete: {
      description: 'Archive a user by {id}.',
      tags: ['Users'],
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
          description: 'User archived.',
        },
      },
    },
  },
};
