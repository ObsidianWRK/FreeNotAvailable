import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/internal')) return NextResponse.next()

  const token = req.cookies.get('internal_auth')?.value
  const validToken = process.env.INTERNAL_AUTH_TOKEN

  if (!validToken || token !== validToken) {
    const loginUrl = new URL('/internal/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = { matcher: ['/internal/((?!login).*)'] }
