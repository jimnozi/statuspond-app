const clients = {
    client1: {
      name: "Client One",
      logo: "https://vmypfazaedqugjiivhed.supabase.co/storage/v1/object/public/logos//client1.png.png",
      status: "✅ All systems operational",
      supportEmail: "support@client1.com",
      services: [
        {
          name: "Homepage",
          status: "up",
          responseTime: "120ms",
          lastChecked: "2 mins ago",
        },
        {
          name: "API",
          status: "down",
          responseTime: "N/A",
          lastChecked: "1 min ago",
        },
        {
          name: "Login Page",
          status: "slow",
          responseTime: "850ms",
          lastChecked: "5 mins ago",
        },
      ],
    },
    client2: {
      name: "Client Two",
      logo: "https://vmypfazaedqugjiivhed.supabase.co/storage/v1/object/public/logos//client2.png.png",
      status: "⚠️ Partial outage in EU",
      supportEmail: "help@client2.com",
      services: [
        {
          name: "Dashboard",
          status: "up",
          responseTime: "99ms",
          lastChecked: "2 mins ago",
        },
        {
          name: "Auth API",
          status: "slow",
          responseTime: "650ms",
          lastChecked: "1 min ago",
        },
        {
          name: "Search Engine",
          status: "down",
          responseTime: "N/A",
          lastChecked: "10 mins ago",
        },
      ],
    },
    default: {
      name: "Unknown Client",
      logo: "https://placehold.co/100x40?text=Unknown",
      status: "❌ Status unknown",
      supportEmail: "support@statuspond.com",
      services: [],
    },
  }
  
  export default clients
  