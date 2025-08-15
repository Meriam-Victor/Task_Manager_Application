import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'A comprehensive task management API built with Node.js, Express, and TypeORM',
      contact: {
        name: 'Task Manager Support',
        email: 'support@taskmanager.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com',
            },
            fullName: {
              type: 'string',
              description: 'Full name of the user',
              example: 'John Doe',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Task ID',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Task title',
              example: 'Complete project documentation',
            },
            description: {
              type: 'string',
              description: 'Task description',
              example: 'Write comprehensive documentation for the project',
            },
            completed: {
              type: 'boolean',
              description: 'Task completion status',
              example: false,
            },
            dueDate: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Task due date',
              example: '2024-12-31',
            },
            priority: {
              type: 'string',
              enum: ['high', 'medium', 'low'],
              nullable: true,
              description: 'Task priority level',
              example: 'high',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
            userId: {
              type: 'integer',
              description: 'ID of the user who owns this task',
              example: 1,
            },
          },
        },
        
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };