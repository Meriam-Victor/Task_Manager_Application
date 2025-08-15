import toast from 'react-hot-toast'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export const handleApiError = (error: any, fallbackMessage: string = 'Something went wrong'): ApiError => {
  console.error('API Error:', error)
  
  // Axios error with response
  if (error.response) {
    return {
      message: error.response.data?.message || fallbackMessage,
      status: error.response.status,
      code: error.response.data?.code
    }
  }
  
  // Network error
  if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0
    }
  }
  
  // Other errors
  return {
    message: error.message || fallbackMessage
  }
}

// Toast notification helper (optional)
export const showErrorToast = (error: ApiError) => {
  toast.error(error.message)
}