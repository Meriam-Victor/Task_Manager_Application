import axios from 'axios'
import type { AuthResponse, LoginData, RegisterData, Task } from '../types/types'
import { handleApiError } from '../utils/errorHandler'

const API_URL = 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

// Auth API with error handling
export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/signin', data)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error, 'Login failed')
      throw new Error(apiError.message)
    }
  },
  
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/signup', data)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error, 'Registration failed')
      throw new Error(apiError.message)
    }
  },
}

// Tasks API with error handling
export const tasksAPI = {
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await api.get('/tasks')
      return response.data
    } catch (error) {
      const apiError = handleApiError(error, 'Failed to load tasks')
      throw new Error(apiError.message)
    }
  },
  
  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Task> => {
    try {
      const response = await api.post('/tasks', task)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error, 'Failed to create task')
      throw new Error(apiError.message)
    }
  },
  
  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    try {
      const response = await api.put(`/tasks/${id}`, task)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error, 'Failed to update task')
      throw new Error(apiError.message)
    }
  },
  
  deleteTask: async (id: number): Promise<void> => {
    try {
      await api.delete(`/tasks/${id}`)
    } catch (error) {
      const apiError = handleApiError(error, 'Failed to delete task')
      throw new Error(apiError.message)
    }
  },
}