import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BackOffice.css'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { MessageModal } from '../components/MessageModal'

function BackOffice() {
  const navigate = useNavigate()
  const [checkingSession, setCheckingSession] = useState(true)
  const [messages, setMessages] = useState([])
  const [fetchError, setFetchError] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCheckingSession(false)
      return
    }

    async function checkSession() {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        navigate('/login', { replace: true })
        return
      }

      setCheckingSession(false)
    }

    checkSession()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login', { replace: true })
      }
    })

    return () => subscription.subscription.unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (checkingSession || !isSupabaseConfigured) {
      return
    }

    async function fetchMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        setFetchError(true)
        return
      }

      setMessages(data)
    }

    fetchMessages()
  }, [checkingSession])

  async function handleDelete(id) {
    const { error } = await supabase.from('messages').delete().eq('id', id)

    if (error) {
      console.error(error)
      setDeleteError(true)
      return
    }

    setDeleteError(false)
    setMessages((prev) => prev.filter((message) => message.id !== id))
    setSelectedMessage((current) => (current && current.id === id ? null : current))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login', { replace: true })
  }

  if (checkingSession) {
    return null
  }

  return (
    <div className="backoffice-page">
      <div className="backoffice-header">
        <h1>Back Office</h1>
        <button type="button" className="backoffice-logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {(!isSupabaseConfigured || fetchError) && (
        <p className="backoffice-error">Could not load messages. Please refresh the page.</p>
      )}

      {deleteError && (
        <p className="backoffice-error">Could not delete that message. Please try again.</p>
      )}

      {isSupabaseConfigured && !fetchError && messages.length === 0 && (
        <p className="backoffice-empty">No messages yet.</p>
      )}

      {isSupabaseConfigured && !fetchError && messages.length > 0 && (
        <div className="backoffice-table-wrap">
          <table className="backoffice-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} onClick={() => setSelectedMessage(message)}>
                  <td data-label="Name">{message.name}</td>
                  <td data-label="Email">
                    <a
                      href={`mailto:${message.email}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {message.email}
                    </a>
                  </td>
                  <td data-label="Date">{new Date(message.created_at).toLocaleDateString()}</td>
                  <td data-label="Actions" className="backoffice-actions">
                    <button
                      type="button"
                      className="backoffice-view"
                      onClick={(event) => {
                        event.stopPropagation()
                        setSelectedMessage(message)
                      }}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="backoffice-delete"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleDelete(message.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
      )}
    </div>
  )
}

export default BackOffice
