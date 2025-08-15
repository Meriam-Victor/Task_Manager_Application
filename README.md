# 📋 Task Manager Application

A full-stack task management application built with React TypeScript frontend and Node.js backend with comprehensive API documentation and testing.

## 🚀 Live Demo & Documentation

- **API Documentation**: http://localhost:3001/api-docs (Swagger UI)
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## 📁 Project Structure

```
Task_Manager_Application/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components (Login, Register, Tasks)
│   │   ├── services/        # API service layer
│   │   ├── styles/          # CSS styling
│   │   └── types/           # TypeScript type definitions
│   ├── public/
│   │   └── deadline.png     # Custom favicon
│   └── package.json
├── backend/                  # Node.js Express backend
│   ├── src/
│   │   ├── config/          # Database & Swagger configuration
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # TypeORM entity models
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Utility functions & validation
│   │   └── __tests__/       # Unit tests
│   └── package.json
├── postman/                  # API testing collection
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Custom CSS** for styling with responsive design
- **Axios** for HTTP requests
- **React Hot Toast** for notifications

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **TypeORM** for database operations
- **MySQL** database
- **JWT** for authentication
- **bcrypt** for password hashing
- **Swagger** for API documentation
- **Jest** for unit testing

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **MySQL** database server
- **Git** for cloning the repository

### MySQL Setup
1. Install MySQL on your system
2. Create a database named `task_manager_application_db`
3. Note your MySQL username and password

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Meriam-Victor/task-manager-application.git
cd task-manager-application
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Create `.env` file in the backend directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_manager_application_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will start on http://localhost:3001

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on http://localhost:5173

### Access the Application
- **Frontend**: http://localhost:5173
- **API Documentation**: http://localhost:3001/api-docs
- **Backend Health Check**: http://localhost:3001

## 🧪 Running Tests

### Backend Unit Tests
```bash
cd backend
npm test

# Run tests in watch mode
npm run test:watch

# View available test scripts
npm run docs
```

### Test Coverage
The test suite covers:
- ✅ JWT token generation and verification
- ✅ Password validation (strength requirements)
- ✅ Email format validation
- ✅ Task title validation
- ✅ Task priority enum validation

**Test Results:**
```
 PASS  src/utils/validation.test.ts
 PASS  src/utils/jwt.test.ts
 PASS  src/models/Task.test.ts

Test Suites: 3 passed, 3 total
Tests:       11 passed, 11 total
Time:        1.752 s
```

## 📡 API Documentation

### Swagger Documentation
Visit http://localhost:3001/api-docs for interactive API documentation with:
- **Interactive testing interface**
- **Request/response examples**
- **Authentication support**
- **Schema validation**

### Authentication Endpoints
```
POST /api/auth/signup - Register new user
POST /api/auth/signin  - User login
```

### Task Management Endpoints
```
GET    /api/tasks     - Get user's tasks
POST   /api/tasks     - Create new task
PUT    /api/tasks/:id - Update existing task
DELETE /api/tasks/:id - Delete task
```

### Using the API
1. **Register/Login** to get JWT token
2. **Include token** in Authorization header: `Bearer <your-token>`
3. **Use token** for all protected endpoints

## 📮 Postman Collection

The `/postman/` directory contains a complete API testing collection.

### Import Instructions:
1. **Import Collection**: Load `Task_Manager_API.postman_collection.json`
2. **Import Environment**: Load `Task_Manager_Environment.postman_environment.json`
3. **Select Environment**: Choose "Task Manager Environment"
4. **Start Testing**: Follow the recommended workflow

### Testing Workflow:
1. **Health Check** → Verify server is running
2. **Register User** → Create account and get token
3. **Login User** → Authenticate existing user
4. **Create Tasks** → Add sample tasks with different priorities
5. **Get Tasks** → Retrieve user's task list
6. **Update Task** → Modify task details and completion status
7. **Delete Task** → Remove tasks

### Features:
- ✅ **Automatic token management** - Login saves JWT automatically
- ✅ **Comprehensive tests** - Each request validates responses
- ✅ **Error scenarios** - Tests validation and edge cases
- ✅ **Variable management** - Task IDs saved automatically
- ✅ **Documentation** - Each request includes descriptions

### Environment Variables:
```
baseUrl: http://localhost:3001
token: (automatically set after login)
taskId: (automatically set after task creation)
```

For detailed instructions, see [`/postman/README.md`](postman/README.md).

## 🎯 Features

### Core Functionality
- ✅ **User registration** with email verification
- ✅ **Secure authentication** with JWT tokens
- ✅ **Create, read, update, delete tasks** (full CRUD)
- ✅ **Task completion** status toggle
- ✅ **Task priority levels** (High, Medium, Low)
- ✅ **Due date assignment** with date picker
- ✅ **Responsive design** for all screen sizes
- ✅ **Real-time form validation** with visual feedback

### Advanced Features
- ✅ **Password strength validation** with visual indicators
- ✅ **Confirm password matching** during registration
- ✅ **Password visibility toggle** for better UX
- ✅ **Task sorting** by creation date (newest first)
- ✅ **Empty state handling** with encouraging messages
- ✅ **Loading states** throughout the application
- ✅ **Error handling** with user-friendly messages

### Technical Features
- ✅ **JWT-based authentication** with token persistence
- ✅ **RESTful API design** following best practices
- ✅ **Interactive API documentation** with Swagger UI
- ✅ **Unit test coverage** for critical functions
- ✅ **TypeScript type safety** throughout the stack
- ✅ **Professional UI/UX** with custom styling
- ✅ **Comprehensive error handling** and validation

## 🚧 Future Enhancements

### Potential Product Improvements
- 📌 **Task Categories/Tags** - Organize tasks by categories
- 🔍 **Task Search and Filtering** - Find tasks quickly
- 👥 **Task Sharing** - Collaborate with other users
- 📧 **Email Notifications** - Reminders for due dates
- 🌙 **Dark Mode** - Theme customization options
- 📱 **Mobile App** - React Native implementation
- 📊 **Task Analytics** - Productivity insights and reports
- 📎 **File Attachments** - Add files and images to tasks
- 🔄 **Task Templates** - Reusable task templates
- ⏰ **Time Tracking** - Track time spent on tasks

### Technical Improvements
- 🧪 **Integration Tests** - Full API endpoint testing
- 🐳 **Docker Containerization** - Easy deployment and scaling
- 📝 **Logging System** - Application monitoring and debugging
- 🔒 **OAuth Integration** - Google/GitHub login options
- 📊 **Performance Monitoring** - Application performance tracking
- 🌍 **Internationalization** - Multi-language support


## 👥 Support & Contact

### Getting Help
- 📋 **Create an issue** in this repository for bugs or feature requests
- 📚 **Check API documentation** at http://localhost:3001/api-docs
- 🧪 **Review Postman collection** for API usage examples
- 🧪 **Run unit tests** to understand functionality (`npm test`)

### Project Maintainer
- **Email**: support@taskmanager.com
- **GitHub**: [@yourusername](https://github.com/yourusername)


---


