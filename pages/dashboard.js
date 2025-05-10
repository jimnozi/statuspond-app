import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import Head from 'next/head'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading || !user) return <p>Loading dashboard...</p>

  return (
    <>
      <Head>
        <title>Your Dashboard – StatusPond</title>
      </Head>

      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome to your dashboard</h1>
        <p>You’re logged in as: <strong>{user.email}</strong></p>

        <p style={{ marginTop: '2rem' }}>
          🚀 Soon you&apos;ll see your monitors and status pages here.
        </p>

        <button onClick={handleLogout} style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}>
          Log Out
        </button>
      </div>
    </>
  )
}
