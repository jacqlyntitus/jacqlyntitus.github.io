import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

function Login() {
  const navigate = useNavigate()
  const [fields, setFields] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        navigate('/backoffice', { replace: true })
      }
    }

    checkSession()
  }, [navigate])

  function handleChange(field, value) {
    setFields((prev) => ({ ...prev, [field]: value }))

    if (error) {
      setError(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isSupabaseConfigured) {
      return
    }

    if (!fields.email.trim() || !fields.password) {
      setError('Please enter your email and password.')
      return
    }

    setSubmitting(true)
    setError(null)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: fields.email.trim(),
      password: fields.password,
    })

    if (signInError) {
      console.error(signInError)
      setError('Incorrect email or password.')
      setSubmitting(false)
      return
    }

    navigate('/backoffice', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        {!isSupabaseConfigured && (
          <p className="login-fallback">Login is unavailable right now.</p>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={fields.email}
              onChange={(event) => handleChange('email', event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={fields.password}
              onChange={(event) => handleChange('password', event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
            />
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={!isSupabaseConfigured || submitting}
          >
            {submitting ? 'Logging in...' : 'Log In'}
          </button>

          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
