import { useEffect, useState } from 'react'
import clients from '../lib/clientData'

export default function Home() {
  const [clientData, setClientData] = useState(null)

  useEffect(() => {
    const subdomain = window.location.hostname.split('.')[0]
    const loadData = () => {
      const data = clients[subdomain] || clients.default
      setClientData(data)
    }

    loadData()

    const interval = setInterval(() => {
      loadData()
    }, 60000) // refresh every 60s

    return () => clearInterval(interval)
  }, [])

  if (!clientData) return <p>Loading...</p>

  const getStatusEmoji = (status) => {
    if (status === 'up') return '🟢'
    if (status === 'slow') return '🟡'
    return '🔴'
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fb', minHeight: '100vh', padding: '2rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={clientData.logo} alt={clientData.name} style={{ height: 40 }} />
        <h1 style={{ marginTop: '1rem', fontSize: '1.8rem', color: '#333' }}>{clientData.name}&apos;s Status Page</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          {clientData.statusMessage || 'All systems are monitored and healthy.'}
        </p>
      </header>

      {/* Overall Status Summary */}
      <div style={{
        background: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        borderLeft: '6px solid green',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '2rem',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <strong>🟢 Current System Status:</strong> {clientData.status}
      </div>

      {/* Service List */}
      <section style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>Service Monitors</h2>
        {clientData.services.map((service, index) => (
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
              <div><strong>Uptime (24h):</strong> {service.uptime || '98.7%'}</div>
              <div><strong>Last Checked:</strong> {new Date().toLocaleString()}</div>
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
  )
}
