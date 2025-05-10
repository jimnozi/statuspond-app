import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ✅ Prevent access from subdomains (only in production)
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production'
    const host = window.location.hostname

    if (isProduction && host !== 'statuspond.com') {
      window.location.href = 'https://statuspond.com/signup'
    }
  }, [])

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Sign Up – StatusPond</title>
      </Head>

      <div style={{ maxWidth: 400, margin: '5rem auto', fontFamily: 'sans-serif' }}>
        <h2 style={{ marginBottom: '1rem' }}>Sign Up to StatusPond</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.5rem' }}>
            {loading ? 'Signing up…' : 'Create Account'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login">Log in</Link>
        </p>
      </div>
    </>
  )
}
