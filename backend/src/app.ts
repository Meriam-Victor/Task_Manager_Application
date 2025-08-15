import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import { swaggerUi, specs } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customSiteTitle: 'Task Manager API Documentation',
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info .title { color: #007bff; }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Test routes
app.get('/api/hello', (req, res) => {
  console.log('API /hello endpoint hit!');
  res.json({ message: 'Hello from backend!' });
});

app.get('/', (req, res) => {
  console.log('Root endpoint hit!');
  res.json({ 
    message: 'Backend server is running!',
    documentation: `http://localhost:${PORT}/api-docs`,
  });
});

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`🚀 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`Available routes:`);
      console.log(`- GET  http://localhost:${PORT}/`);
      console.log(`- GET  http://localhost:${PORT}/api/hello`);
      console.log(`- POST http://localhost:${PORT}/api/auth/signup`);
      console.log(`- POST http://localhost:${PORT}/api/auth/signin`);
      console.log(`- GET  http://localhost:${PORT}/api/tasks`);
      console.log(`- POST http://localhost:${PORT}/api/tasks`);
      console.log(`- PUT  http://localhost:${PORT}/api/tasks/:id`);
      console.log(`- DELETE http://localhost:${PORT}/api/tasks/:id`);
      console.log(`------------------------------------------------`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });