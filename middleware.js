import { NextResponse } from 'next/server'

export function middleware(request) {
  const hostname = request.headers.get('host') || ''
  const currentHost = hostname.split('.')[0]

  // Store subdomain in a header (or cookie if needed)
  const response = NextResponse.next()
  response.headers.set('x-subdomain', currentHost)
  return response
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico).*)'],
}
