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

  if (loading) return <p>Loading dashboard...</p>

  return (
    <>
      <Head>
        <title>Your Dashboard – StatusPond</title>
      </Head>

      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome to your dashboard</h1>
        <p>You’re logged in as: <strong>{user.email}</strong></p>
        <p>🚀 Soon you&apos;ll see your monitors and status pages here.</p>
      </div>
    </>
  )
}
