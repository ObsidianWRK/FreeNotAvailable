'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function InternalLoginPage() {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError(false)

      try {
        const res = await fetch('/api/internal-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: value.trim() }),
        })

        if (res.ok) {
          router.push('/internal')
        } else {
          setError(true)
          setValue('')
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    [value, router],
  )

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-xs text-center">
        <h1 className="font-pixel text-2xl text-heading tracking-[0.04em] mb-2">
          INTERNAL
        </h1>
        <p className="text-xs font-sans tracking-[0.15em] uppercase text-white/30 mb-10">
          This page is private
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          placeholder="Password"
          autoFocus
          className="w-full bg-transparent border border-white/10 focus:border-white/30 px-4 py-3 text-sm font-sans text-white placeholder:text-white/20 outline-none transition-colors tracking-wider"
        />

        {error && (
          <p className="mt-3 text-xs font-sans text-accent/80">
            Incorrect password.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full border border-white/10 hover:border-white/30 px-4 py-3 text-xs font-sans tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Enter'}
        </button>
      </form>
    </div>
  )
}
