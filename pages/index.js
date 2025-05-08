import { useEffect, useState, useCallback } from 'react'
import clients from '../lib/clientData'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const [clientData, setClientData] = useState(null)
  const [liveServices, setLiveServices] = useState([])

  const checkUrlStatus = async (url) => {
    const start = Date.now()
    try {
      await fetch(url, { method: 'GET', mode: 'no-cors' })
      const duration = Date.now() - start
      return {
        status: 'up',
        responseTime: `${duration}ms`,
        lastChecked: new Date().toLocaleString(),
      }
    } catch {
      return {
        status: 'down',
        responseTime: 'N/A',
        lastChecked: new Date().toLocaleString(),
      }
    }
  }

  const loadLiveStatus = useCallback(async (client) => {
    const updated = await Promise.all(
      client.services.map(async (service) => {
        const live = await checkUrlStatus(service.url)
        return {
          ...service,
          ...live,
        }
      })
    )
    setLiveServices(updated)
  }, [])

  useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0]
    const client = clients[subdomain] || clients.default
    setClientData(client)
    loadLiveStatus(client)

    const interval = setInterval(() => {
      loadLiveStatus(client)
    }, 60000)

    return () => clearInterval(interval)
  }, [loadLiveStatus])

  const getStatusEmoji = (status) => {
    if (status === 'up') return '🟢'
    if (status === 'slow') return '🟡'
    return '🔴'
  }

  if (!clientData || liveServices.length === 0) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>{clientData.name} – Status Page | StatusPond</title>
      </Head>

      <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fb', minHeight: '100vh', padding: '2rem' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image
            src={clientData.logo}
            alt={clientData.name}
            width={100}
            height={40}
            unoptimized
          />
          <h1 style={{ marginTop: '1rem', fontSize: '1.8rem', color: '#333' }}>
            {clientData.name}&apos;s Status Page
          </h1>
          <p style={{ fontStyle: 'italic', color: '#666' }}>
            {clientData.statusMessage || 'All systems are monitored and healthy.'}
          </p>
        </header>

        {/* Overall Status Summary */}
        <div style={{
          background: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: '10px',
          borderLeft: liveServices.some(s => s.status === 'down') ? '6px solid red' :
                      liveServices.some(s => s.status === 'slow') ? '6px solid orange' :
                      '6px solid green',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
        }}>
          <strong>
            {liveServices.some(s => s.status === 'down')
              ? '🔴 Some services are currently down'
              : liveServices.some(s => s.status === 'slow')
              ? '🟡 Some services are experiencing slowness'
              : '🟢 All systems operational'}
          </strong>
        </div>

        {/* Service List */}
        <section style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>Live Service Checks</h2>
          {liveServices.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                borderLeft: `5px solid ${
                  service.status === 'up'
                    ? 'green'
                    : service.status === 'slow'
                    ? 'orange'
                    : 'red'
                }`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <strong>{getStatusEmoji(service.status)} {service.name}</strong>
              <div style={{ fontSize: '0.9rem', color: '#444', marginTop: '0.5rem' }}>
                <div><strong>Status:</strong> {service.status.toUpperCase()}</div>
                <div><strong>Response Time:</strong> {service.responseTime}</div>
                <div><strong>Uptime (24h):</strong> {service.uptime || 'N/A'}</div>
                <div><strong>Last Checked:</strong> {service.lastChecked}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer style={{ marginTop: '4rem', textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
          Need help? Contact <a href={`mailto:${clientData.supportEmail}`} style={{ color: '#0066cc' }}>{clientData.supportEmail}</a><br />
          Powered by <strong>StatusPond</strong>
        </footer>
      </div>
    </>
  )
}
