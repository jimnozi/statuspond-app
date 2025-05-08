import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'
import Head from 'next/head'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
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
        <title>Login – StatusPond</title>
      </Head>

      <div style={{ maxWidth: 400, margin: '5rem auto', fontFamily: 'sans-serif' }}>
        <h2 style={{ marginBottom: '1rem' }}>Log in to StatusPond</h2>
        <form onSubmit={handleLogin}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.5rem' }}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link href="/signup">
            Sign up here
          </Link>
        </p>
      </div>
    </>
  )
}
