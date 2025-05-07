import { useEffect, useState } from 'react'
import Image from 'next/image'
import clients from '../lib/clientData'

export default function Home() {
  const [clientData, setClientData] = useState(null)

  useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0]
    const data = clients[subdomain] || clients.default
    setClientData(data)
  }, [])

  if (!clientData) return <p>Loading...</p>

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Image
        src={clientData.logo}
        alt={clientData.name}
        width={100}
        height={40}
        unoptimized // needed for external image URLs
      />
      <h1>{clientData.name}&apos;s Status Page</h1>
      <p>{clientData.status}</p>
      <p>
        Need help? Email{' '}
        <a href={`mailto:${clientData.supportEmail}`}>
          {clientData.supportEmail}
        </a>
      </p>
    </div>
  )
}
