import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>StatusPond - Client Status</title>
        <meta name="theme-color" content="#f8f9fb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Live system status for your services" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
