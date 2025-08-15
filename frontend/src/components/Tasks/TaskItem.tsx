import { useState } from 'react'
import type { Task, TaskPriority } from '../../types/types'
import Modal from '../Common/Modal'
import ConfirmDialog from '../Common/ConfirmDialog'

interface TaskItemProps {
  task: Task
  onUpdate: (id: number, updates: Partial<Task>, action?: 'toggle' | 'edit') => void
  onDelete: (id: number) => void
}

function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    onUpdate(task.id, { completed: e.target.checked }, 'toggle')
  }

  const handleCheckboxContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleTaskClick = () => {
    setShowEditModal(true)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleSaveEdit = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      await onUpdate(task.id, taskData, 'edit')
      setShowEditModal(false)
    } catch (error) {
      console.error('Error updating task:', error)
      throw error 
    }
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      await onDelete(task.id)
      setShowDeleteDialog(false)
    } catch (error) {
      console.error('Error deleting task:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false)
  }

  // Helper function to format due date and check if overdue
  const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return null
    
    const due = new Date(dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)
    
    const isOverdue = due < today && !task.completed
    const isToday = due.getTime() === today.getTime()
    const isTomorrow = due.getTime() === new Date(today.getTime() + 24 * 60 * 60 * 1000).getTime()
    
    let dateText = due.toLocaleDateString()
    
    if (isToday) dateText = `Today (${dateText})`
    else if (isTomorrow) dateText = `Tomorrow (${dateText})`
    
    return { dateText, isOverdue, isToday }
  }

  // Helper function to format priority
  const getPriorityDisplay = (priority: TaskPriority | null) => {
    if (!priority) return null
    
    const priorityConfig = {
      high: { emoji: '🔴', text: 'High', color: '#dc3545', bg: '#ffe6e6' },
      medium: { emoji: '🟡', text: 'Medium', color: '#fd7e14', bg: '#fff3cd' },
      low: { emoji: '🟢', text: 'Low', color: '#28a745', bg: '#e6f3e6' }
    }
    
    return priorityConfig[priority]
  }

  const dueDateInfo = formatDueDate(task.dueDate)
  const priorityInfo = getPriorityDisplay(task.priority)

  return (
    <>
      <div 
        className={`card task-item-clickable ${task.completed ? 'opacity-50' : ''} ${
          dueDateInfo?.isOverdue ? 'task-overdue' : ''
        }`}
        onClick={handleTaskClick}
        title="Click to edit task"
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}
              onClick={handleCheckboxContainerClick}
            >
              <input
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.completed}
                onChange={handleToggleComplete}
                className="task-checkbox"
              />
            </div>
            
            <div className="task-text-content" style={{ flex: 1 }}>
              <h3 style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                margin: '0 0 0.5rem 0'
              }}>
                {task.title}
              </h3>
              <p style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                margin: '0 0 0.5rem 0',
                color: task.completed ? '#666' : 'inherit'
              }}>
                {task.description}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {dueDateInfo && (
                  <div style={{ 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: dueDateInfo.isOverdue ? '#dc3545' : dueDateInfo.isToday ? '#856404' : '#0c63e4',
                  }}>
                    🗓️ {dueDateInfo.isOverdue ? '⚠️ Overdue: ' : 'Due: '}{dueDateInfo.dateText}
                  </div>
                )}

                {priorityInfo && (
                  <div style={{ 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    backgroundColor: priorityInfo.bg,
                    color: priorityInfo.color,
                    border: `1px solid ${priorityInfo.color}30`,
                    fontWeight: '500'
                  }}>
                    {priorityInfo.emoji} {priorityInfo.text}
                  </div>
                )}
              </div>
            </div>
            
            <div className="task-actions">
              <button 
                onClick={handleDeleteClick} 
                className="btn-delete-svg"
                title="Delete task"
                aria-label="Delete task"
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>

          
        </div>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={handleCancelEdit}
        title="Edit Task"
      >
        <EditTaskForm
          task={task}
          onSubmit={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </>
  )
}

interface EditTaskFormProps {
  task: Task
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void
  onCancel: () => void
}

function EditTaskForm({ task, onSubmit, onCancel }: EditTaskFormProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate || '',
    priority: task.priority || '' as TaskPriority | '',  
    completed: task.completed
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && !isSubmitting) {
      setIsSubmitting(true)
      try {
        const submitData = {
          ...formData,
          dueDate: formData.dueDate || null,
          priority: formData.priority || null
        }
        await onSubmit(submitData)
      } catch (error) {
        console.error('Error updating task:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="edit-title">Task Title *</label>
        <input
          type="text"
          id="edit-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Enter task title..."
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="edit-description">Description</label>
        <textarea
          id="edit-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          placeholder="Enter task description (optional)..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-due-date">Due Date (optional)</label>
        <input
          type="date"
          id="edit-due-date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-priority">Priority (optional)</label>
        <select
          id="edit-priority"
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
      
      <div className="form-group">
        <label htmlFor="edit-completed" className="checkbox-label">
          <input
            type="checkbox"
            id="edit-completed"
            checked={formData.completed}
            onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
          />
          Mark as completed
        </label>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <button 
          type="button" 
          onClick={onCancel} 
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
          {isSubmitting ? 'Updating...' : 'Update Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskItem