const clients = {
    client1: {
      name: "Client One",
      logo: "https://vmypfazaedqugjiivhed.supabase.co/storage/v1/object/public/logos/client1.png.png",
      statusMessage: "All systems are being monitored in real time.",
      supportEmail: "support@client1.com",
      services: [
        {
          name: "Homepage",
          url: "https://nairaland.com"
        },
        {
          name: "API",
          url: "https://jsonplaceholder.typicode.com/posts"
        },
        {
          name: "Login Page",
          url: "https://httpstat.us/200?sleep=500" // fake slow endpoint
        }
      ]
    },
  
    client2: {
      name: "Client Two",
      logo: "https://vmypfazaedqugjiivhed.supabase.co/storage/v1/object/public/logos/client2.png.png",
      statusMessage: "Partial systems are operational. Monitoring in progress.",
      supportEmail: "help@client2.com",
      services: [
        {
          name: "Dashboard",
          url: "https://example.com"
        },
        {
          name: "Auth API",
          url: "https://httpstat.us/500" // simulates error
        },
        {
          name: "Search Engine",
          url: "https://duckduckgo.com"
        }
      ]
    },
  
    default: {
      name: "Unknown Client",
      logo: "https://placehold.co/100x40?text=Unknown",
      statusMessage: "No data available.",
      supportEmail: "support@statuspond.com",
      services: []
    }
  }
  
  export default clients
  