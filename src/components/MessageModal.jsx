import { useEffect } from 'react'
import { X } from 'lucide-react'
import './MessageModal.css'

export function MessageModal({ message, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="message-modal-backdrop" onClick={handleBackdropClick}>
      <div className="message-modal" role="dialog" aria-modal="true">
        <div className="message-modal-header">
          <button
            type="button"
            className="message-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
            Close
          </button>
        </div>

        <dl className="message-modal-fields">
          <div className="message-modal-field">
            <dt>From</dt>
            <dd>{message.name}</dd>
          </div>

          <div className="message-modal-field">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${message.email}`}>{message.email}</a>
            </dd>
          </div>

          <div className="message-modal-field">
            <dt>Received</dt>
            <dd>{new Date(message.created_at).toLocaleString()}</dd>
          </div>
        </dl>

        <p className="message-modal-body">{message.message}</p>
      </div>
    </div>
  )
}
