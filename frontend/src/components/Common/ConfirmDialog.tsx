import Modal from './Modal'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ padding: '1rem 0' }}>
        <p style={{ marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }}>
          {message}
        </p>
        
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isLoading}
            style={{ 
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none'
            }}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-danger"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog