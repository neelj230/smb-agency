'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import type { ContactFormProps } from './types'

/**
 * Standalone contact form with client-side submission.
 * Sends form data to /api/contact which forwards via Resend.
 */
export function ContactForm({
  businessSlug,
  recipientEmail,
  heading = 'Send Us a Message',
  showPhone = true,
  submitText = 'Send Message',
  successMessage = 'Thank you! We\'ll get back to you shortly.',
  className = '',
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      businessSlug,
      recipientEmail,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send message')
      setStatus('success')
    } catch {
      setErrorMessage('Something went wrong. Please try calling us instead.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
        <p className="text-lg font-semibold text-[var(--brand-text)]">{successMessage}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {heading && (
        <h3 className="text-2xl font-bold text-[var(--brand-text)] mb-6">{heading}</h3>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor={`${businessSlug}-name`} className="block text-sm font-medium text-[var(--brand-text)] mb-1.5">
            Name
          </label>
          <input
            type="text"
            id={`${businessSlug}-name`}
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[var(--brand-bg)] text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 transition-shadow"
          />
        </div>

        <div className={showPhone ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : ''}>
          <div>
            <label htmlFor={`${businessSlug}-email`} className="block text-sm font-medium text-[var(--brand-text)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              id={`${businessSlug}-email`}
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[var(--brand-bg)] text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 transition-shadow"
            />
          </div>
          {showPhone && (
            <div>
              <label htmlFor={`${businessSlug}-phone`} className="block text-sm font-medium text-[var(--brand-text)] mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                id={`${businessSlug}-phone`}
                name="phone"
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[var(--brand-bg)] text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 transition-shadow"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor={`${businessSlug}-message`} className="block text-sm font-medium text-[var(--brand-text)] mb-1.5">
            Message
          </label>
          <textarea
            id={`${businessSlug}-message`}
            name="message"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[var(--brand-bg)] text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 resize-none transition-shadow"
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <span className="animate-pulse">Sending...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {submitText}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
