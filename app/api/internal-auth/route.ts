import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()
  const validPassword = process.env.INTERNAL_PASSWORD || 'free'

  if (password === validPassword) {
    const token = process.env.INTERNAL_AUTH_TOKEN || crypto.randomUUID()
    const res = NextResponse.json({ success: true })
    res.cookies.set('internal_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return res
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
