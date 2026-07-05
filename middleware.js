import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Skip redirect in local development
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
  if (isLocalhost) {
    return NextResponse.next()
  }

  // Redirect www to non-www (Commented out to prevent Vercel DNS redirect loop)
  // if (hostname.startsWith('www.')) {
  //   const newHost = hostname.substring(4) // remove 'www.'
  //   const newUrl = `https://${newHost}${url.pathname}${url.search}`
  //   return NextResponse.redirect(newUrl, 301)
  // }

  // Redirect http to https (Vercel handles this automatically, but safe for all platforms)
  const proto = request.headers.get('x-forwarded-proto')
  if (proto === 'http') {
    const newUrl = `https://${hostname}${url.pathname}${url.search}`
    return NextResponse.redirect(newUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|api).*)',
  ],
}
