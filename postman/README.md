# 📮 Postman Collection for Task Manager API

This directory contains Postman collection and environment files for testing the Task Manager API.

## 📁 Files

- `Task_Manager_API.postman_collection.json` - Complete API collection
- `Task_Manager_Environment.postman_environment.json` - Environment variables
- `README.md` - This documentation

## 🚀 Quick Start

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select `Task_Manager_API.postman_collection.json`
4. Import `Task_Manager_Environment.postman_environment.json`

### 2. Set Environment
1. Select "Task Manager Environment" from the environment dropdown
2. Ensure `baseUrl` is set to `http://localhost:3001`

### 3. Start Your Server
```bash
cd backend
npm run dev
```

## 🧪 Testing Workflow

### Recommended Order:
1. **Health Check** → Server Health
2. **Authentication** → Register User
3. **Authentication** → Login User (token auto-saved)
4. **Tasks** → Create Task (task ID auto-saved)
5. **Tasks** → Get All Tasks
6. **Tasks** → Update Task
7. **Tasks** → Delete Task

## 🔐 Authentication

The collection automatically handles authentication:
- Login/Register endpoints save JWT tokens
- All task endpoints use the saved token
- Token is stored in collection variable `{{token}}`

## 🎯 Collection Structure

### Authentication
- Register User
- Login User

### Tasks
- Get All Tasks
- Create Task
- Update Task
- Delete Task

### Health Check
- Server Health
- API Health

## 🔄 Variables

### Environment Variables:
- `baseUrl` - API base URL (http://localhost:3001)
- `token` - JWT authentication token (auto-set)
- `taskId` - Last created task ID (auto-set)
- `userId` - Current user ID (auto-set)

### Collection Variables:
Variables are automatically managed by test scripts.

## 📈 Expected Results

### Successful Flow:
```
✅ Server Health: 200 OK
✅ Register User: 201 Created → Token saved
✅ Login User: 200 OK → Token updated
✅ Create Task: 201 Created → Task ID saved
✅ Get All Tasks: 200 OK → Array with tasks
✅ Update Task: 200 OK → Task modified
✅ Delete Task: 200 OK → Task removed
```

## 🛠️ Customization

### Add New Tests:
1. Right-click collection → Add Request
2. Configure URL, method, headers
3. Add test scripts in "Tests" tab
4. Use collection variables: `{{baseUrl}}`, `{{token}}`

### Modify Environment:
- Change `baseUrl` for different environments
- Add custom variables as needed

## 🚨 Troubleshooting

### Common Issues:

**401 Unauthorized:**
- Ensure you've run Register or Login first
- Check that token is saved in variables

**Connection Refused:**
- Verify backend server is running on port 3001
- Check `baseUrl` in environment variables

**Test Failures:**
- Review test scripts in failing requests
- Check response format matches expected structure

### Debug Mode:
Enable Postman Console (View → Show Postman Console) to see:
- Request/response details
- Test script output
- Variable values