export interface User {
  id: number
  email: string
  fullName: string
}

export type TaskPriority = 'high' | 'medium' | 'low'

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate: string | null
  priority: TaskPriority | null
  createdAt: string
  updatedAt: string
  userId: number
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  fullName: string
  password: string
}