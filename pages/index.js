import { useEffect, useState } from 'react'

export default function Home() {
  const [clientName, setClientName] = useState('')

  useEffect(() => {
    const sub = window.location.hostname.split('.')[0]
    setClientName(sub)
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to {clientName}'s status page!</h1>
      <p>This is the public status page for <strong>{clientName}</strong>.</p>
    </div>
  )
}
