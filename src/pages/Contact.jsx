import { useState } from 'react'
import { Check, X } from 'lucide-react'
import './Contact.css'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!fields.message.trim()) {
    errors.message = 'Please enter a message.'
  }

  return errors
}

function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  function handleChange(field, value) {
    const nextFields = { ...fields, [field]: value }
    setFields(nextFields)

    if (errors[field]) {
      setErrors(validate(nextFields))
    }

    if (status) {
      setStatus(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isSupabaseConfigured) {
      return
    }

    const validationErrors = validate(fields)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    setStatus(null)

    const { error } = await supabase.from('messages').insert({
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    })

    if (error) {
      console.error(error)
      setStatus('error')
      setSubmitting(false)
      return
    }

    setFields({ name: '', email: '', message: '' })
    setErrors({})
    setStatus('success')
    setSubmitting(false)

    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <p className="contact-intro">Get in touch about opportunities, projects, or questions.</p>

      <div className="contact-card">
        {!isSupabaseConfigured && (
          <p className="contact-fallback">
            The contact form is unavailable right now. Please email me directly at jacqlyntitus@gmail.com.
          </p>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              value={fields.name}
              onChange={(event) => handleChange('name', event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
            />
            {errors.name && <p className="contact-error">{errors.name}</p>}
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              value={fields.email}
              onChange={(event) => handleChange('email', event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
            />
            {errors.email && <p className="contact-error">{errors.email}</p>}
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={5}
              value={fields.message}
              onChange={(event) => handleChange('message', event.target.value)}
              disabled={!isSupabaseConfigured || submitting}
            />
            {errors.message && <p className="contact-error">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="contact-submit"
            disabled={!isSupabaseConfigured || submitting}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="contact-status contact-status-success">
              <Check size={18} />
              Thanks for reaching out. Your message has been sent.
            </p>
          )}

          {status === 'error' && (
            <p className="contact-status contact-status-error">
              <X size={18} />
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Contact
