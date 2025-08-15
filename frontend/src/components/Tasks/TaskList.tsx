import { useState, useEffect } from 'react'
import { tasksAPI } from '../../services/api'
import type { Task, TaskPriority } from '../../types/types'
import TaskItem from './TaskItem'
import Modal from '../Common/Modal'
import Loading from '../Common/Loading'
import toast from 'react-hot-toast' 

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '' as TaskPriority | '',
    completed: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setError('')
      const tasksData = await tasksAPI.getTasks()
      setTasks(tasksData || [])
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to load tasks'
      setError(errorMessage)
      toast.error(errorMessage) 
    } finally {
      setLoading(false)
    }
  }

  const handleTaskCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    const toastId = toast.loading('Creating task...')
    
    try {
      setError('')
      const taskData = {
        ...formData,
        priority: formData.priority || null
      }
      const newTask = await tasksAPI.createTask(taskData)
      setTasks([newTask, ...tasks])
      setFormData({ title: '', description: '', dueDate: '', priority: '', completed: false })
      setShowModal(false)
      toast.success('Task created successfully! 🎉', { id: toastId })
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create task'
      setError(errorMessage)
      toast.error(errorMessage, { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTaskUpdate = async (
    id: number, 
    updates: Partial<Task>, 
    action: 'toggle' | 'edit' = 'edit'
  ) => {
    try {
      const updatedTask = await tasksAPI.updateTask(id, updates)
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
      
      if (action === 'toggle') {
        toast.success(updates.completed ? 'Task completed! ✅' : 'Task reopened! 🔄')
      } else {
        toast.success('Task updated successfully! 📝')
      }
    } catch (error: any) {
      console.error('Failed to update task:', error.message)
      toast.error('Failed to update task')
    }
  }

  const handleTaskDelete = async (id: number) => {
    try {
      await tasksAPI.deleteTask(id)
      setTasks(tasks.filter(task => task.id !== id))
      toast.success('Task deleted successfully! 🗑️')
    } catch (error: any) {
      console.error('Failed to delete task:', error.message)
      toast.error('Failed to delete task')
      throw error
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setError('')
    setFormData({ title: '', description: '', dueDate: '', priority: '', completed: false })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h2>TODO ({tasks.length})</h2>
        
        {tasks.length > 0 && (
          <button 
            onClick={() => setShowModal(true)} 
            className="btn btn-primary btn-icon-only fade-in"
            title="Add new task"
            aria-label="Add new task"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div>
        {tasks.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-state-icon">🎯</div>
              <h3>Welcome to your Task Manager!</h3>
              <p>You don't have any tasks yet.</p>
              
              <button 
                onClick={() => setShowModal(true)}
                className="btn btn-primary btn-first-task"
                title="Create your first task"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{ marginRight: '0.5rem' }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create your first task
              </button>
            </div>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Create New Task"
      >
        <form onSubmit={handleTaskCreate}>
          <div className="form-group">
            <label htmlFor="create-title">Task Title *</label>
            <input
              type="text"
              id="create-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter task title..."
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="create-description">Description</label>
            <textarea
              id="create-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Enter task description (optional)..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="create-due-date">Due Date (optional)</label>
            <input
              type="date"
              id="create-due-date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="create-priority">Priority (optional)</label>
            <select
              id="create-priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority | '' })}
              className="form-control"
            >
              <option value="">Select priority...</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              onClick={handleCloseModal} 
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting || !formData.title.trim()}
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default TaskList